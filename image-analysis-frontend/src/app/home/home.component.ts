import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedFile: File | undefined;
  isDragging = false;
  imageUrl:string | undefined;
  megapixels:string | undefined;
  mean_color:string | undefined;
  people_count:string | undefined;
  width:string | undefined;
  height:string | undefined;
  imageSrc: string = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    this.selectedFile = event.dataTransfer?.files[0];
  }

  @HostListener('window:dragover', ['$event'])
  onGlobalDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  @HostListener('window:drop', ['$event'])
  onGlobalDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.selectedFile = file;
  }

  uploadImage() {

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData
      }).then(response => response.json())
        .then(result => {
          console.log('Success:', result);
          alert(result.message);
          this.imageUrl = result.image_url;
          this.megapixels = result.megapixels;
          this.mean_color = "rgb(" + result.mean_color[0] + "," + result.mean_color[1] + "," + result.mean_color[2] + ")";
          this.imageSrc = result.image_url;
          this.people_count = result.people_count;
          this.width = result.width + ' px';
          this.height = result.height + ' px';
        })
        .catch(error => {
          console.error('Error:', error);
          alert(error);
        });
    }
  }

  cancelImage() {
    this.selectedFile = undefined;
  }
}
