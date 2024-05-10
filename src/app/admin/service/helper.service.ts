import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private toastr : ToastrService) { }

  Message(requestParameters : Partial<RequestParameters>) {
    if (requestParameters.type == "success")
      this.toastr.success(requestParameters.message, requestParameters.title? requestParameters.title : "Başarılı");

    else if (requestParameters.type == "error"){
      if(requestParameters.code == "0")
        this.toastr.error("Sunucu İletişimi Kesildi!", requestParameters.title? requestParameters.title : "Hata");
      else if(requestParameters.code == 500)
        this.toastr.error("Sunucu Hatası", requestParameters.title? requestParameters.title : "Hata");
      else
        this.toastr.error(requestParameters.message, requestParameters.title? requestParameters.title : "Hata");
    }

    else if (requestParameters.type == "warning")
      this.toastr.warning(requestParameters.message, requestParameters.title? requestParameters.title : "Uyarı");

    else if (requestParameters.type == "info")
      this.toastr.info(requestParameters.message, requestParameters.title? requestParameters.title : "Bilgilendirme");
  }
}

export class RequestParameters{
  message? : string;
  title? : string;
  type? : string;
  code? : any;
}
