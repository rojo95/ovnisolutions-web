import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { FormControl, Validators, FormBuilder } from "@angular/forms";
import { trigger, style, animate, transition } from "@angular/animations";

import { SwalComponent } from "@sweetalert2/ngx-sweetalert2";

// import { SendMessageService } from "src/app/services/send-message/send-message.service";

@Component({
  selector: "app-contact-us-form-stepper",
  templateUrl: "./contact-us-form-stepper.component.html",
  styleUrls: ["./contact-us-form-stepper.component.scss"],
  animations: [
    trigger(
      "enterAnimation", [
        transition(":enter", [
          style({transform: "translateX(100%)", opacity: 0}),
          animate("500ms", style({transform: "translateX(0)", opacity: 1}))
        ]),
        transition(":leave", [
          style({transform: "translateX(0)", opacity: 1}),
          animate("500ms", style({transform: "translateX(100%)", opacity: 0}))
        ])
      ]
    )
  ],
})
export class ContactUsFormStepperComponent implements OnInit {

  @ViewChild("deleteSwal") public readonly deleteSwal!: SwalComponent;
  @Input() idioma:any;
  @ViewChild("firstForm") first : any;
  firstFormGroup:any = {
    values: "",
    invalid: true
  };
  protected sended = false;
  // secondFormGroup:any = {
  //   values: '',
  //   invalid: true
  // };
  ct_id = 1;
  service_id = 0;
  subservice_id = 0;
  subS_index = 0;
  disabled = false;
  swalTitle:any;
  swalText:any;
  swalIcon:any;

  public secondFormGroup = this.formBuilder.group({
    service: new FormControl("1",[Validators.required]),
    subService: new FormControl("1",[Validators.required]),
    message: new FormControl('Loguitos mamones',[Validators.required]),
    // reCaptcha: new FormControl('',[Validators.required])
  });

  constructor(
    private formBuilder: FormBuilder,
    // private sendMessage:SendMessageService,
  ) { }

  fillFirstForm(data:object) {
    this.firstFormGroup = data;
  this.ct_id = this.firstFormGroup.value.client_type ? this.firstFormGroup.value.client_type-1 : 0;
  }

  /**
   * Funcion para identificar el index del array del subservicio
   * @param id
   */
  getindexSubService(id:number){
    const array = this.idioma.contactanos.form.inputs.service.services[this.service_id].sub;
    const index = array.findIndex((object:any) => {
      console.log(object);
      return object.val == id;
    });
    this.subS_index=index;
  }

  ngOnInit(): void {
    // code
  }

  secondForm() {
    this.first.fillFirstForm();
  }


  swal() {
    this.deleteSwal.fire();
  }

  public sendRequest(): void {

    this.sended = true;
    const requires = {
      name: this.firstFormGroup.value.name,
      lastname: this.firstFormGroup.value.lastname,
      phone: this.firstFormGroup.value.phone,
      email: this.firstFormGroup.value.email,
      client_type: this.firstFormGroup.value.client_type,
      country: this.firstFormGroup.value.country,
      service: this.secondFormGroup.get("service")?.value,
      subservice: this.secondFormGroup.get("subService")?.value,
      message: this.secondFormGroup.get("message")?.value,
      lang: Number(localStorage.getItem("lang")),
    };
    console.log(requires);
    if(!this.firstFormGroup.invalid){
      // this.sendMessage.send(requires);

      // setInterval(()=> {
      //   this.sended = false;
      // }, 3000);
    }
  }

}
