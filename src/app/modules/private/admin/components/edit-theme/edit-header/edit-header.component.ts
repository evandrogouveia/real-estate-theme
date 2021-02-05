import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-header',
  templateUrl: './edit-header.component.html',
  styleUrls: ['./edit-header.component.scss']
})
export class EditHeaderComponent implements OnInit {
  imagemSrc = 'assets/img/placeholder.jpg';
  selectedImage: any = null;
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

}
