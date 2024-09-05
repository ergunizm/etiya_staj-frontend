import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Namespace } from 'src/app/model/namespace.model';
import { NamespaceService } from 'src/app/services/namespace.service';

@Component({
  selector: 'app-namespace',
  templateUrl: './namespace.component.html',
  styleUrls: ['./namespace.component.css']
})
export class NamespaceComponent implements OnInit {
  namespaces : Namespace[] = []
  createForm!: FormGroup
  isCreateOpen = false
  isUpdateOpen = false
  selectedId! : number

  constructor(private service : NamespaceService,
              private fb: FormBuilder,
              private toastr : ToastrService) {
    this.service.getNamespaces().subscribe(res =>{
      this.namespaces = res
    })
    this.buildCreateForm()
  }

  ngOnInit(): void {
  }

  buildCreateForm(): void {
    this.createForm = this.fb.group({
      namespace: ['', [
        Validators.required
      ],],
      controlKey: ['', [
        Validators.required
      ],],
    });
  }

  createNs(){
    this.service.createNamespace(this.createForm.get('namespace')?.value, this.createForm.get('controlKey')?.value).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.data.namespace + " " + res.data.controlKey, res.message)
        this.namespaces.push(res.data)
      }else{
        this.toastr.error(res.message, "Create Namespace Error")
      }
      
    })
  }

  updateNs(){
    this.service.updateNamespace(this.selectedId, this.createForm.get('namespace')?.value, this.createForm.get('controlKey')?.value).subscribe(res=>{
      if(res.success){
        this.toastr.success(res.data.namespace + " " + res.data.controlKey, res.message)
        const index = this.namespaces.findIndex(ns => ns.id === this.selectedId)
        this.namespaces[index] = res.data
      }else{
        this.toastr.error(res.message, "Update Namespace Error")
      }
      
    })
  }

  deleteNs(id : number){
    this.service.deleteNamespace(id).subscribe(res=>{
      if(res.success){
        this.toastr.success(id.toString(), res.message)
        const index = this.namespaces.findIndex(ns => ns.id === id)
        if (index !== -1) {
          this.namespaces.splice(index, 1)
        }
      }else{
        this.toastr.error(res.message, "Delete Namespace Error")
      }
      
    })
  }
}
