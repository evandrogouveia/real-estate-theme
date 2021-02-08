import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-banner-home',
  templateUrl: './edit-banner-home.component.html',
  styleUrls: ['./edit-banner-home.component.scss']
})
export class EditBannerHomeComponent implements OnInit {
  imagemSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
  checked: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  showPreviewImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imagemSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imagemSrc = 'assets/img/icons/user-empty.svg';
      this.selectedImage = null;
    }
  }

  isChecked(event){
    this.checked = event.target.checked;
  }


}
