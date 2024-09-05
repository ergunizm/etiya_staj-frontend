import { Namespace } from 'src/app/model/namespace.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NamespaceService {
  url : string = "http://localhost:8080/namespaces"
  ns! : Namespace

  constructor(private http: HttpClient) { }

  getNamespaces() : Observable<Namespace[]>{
    return this.http.get<Namespace[]>(this.url)
  }

  createNamespace(namespace : string, ckey : string) : Observable<{message:string, success:string, data:Namespace}>{
    return this.http.post<{message:string, success:string, data:Namespace}>(this.url,{
      namespace : namespace,
      controlKey : ckey
    })
  }

  updateNamespace(id : number, namespace : string, ckey : string) : Observable<{message:string, success:string, data:Namespace}>{
    return this.http.put<{message:string, success:string, data:Namespace}>(this.url+"/update",{
      id : id,
      namespace : namespace,
      controlKey : ckey
    })
  }

  deleteNamespace(id : number) : Observable<{message:string, success:string}> {
    let params = new HttpParams().append("id", id.toString())
    return this.http.delete<{message:string, success:string}>(this.url, {params:params})
  }
}
