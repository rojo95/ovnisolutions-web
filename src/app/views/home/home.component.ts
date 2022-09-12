import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('home', { static: true }) home!: ElementRef;
  @ViewChild('team', { static: true }) team!: ElementRef;
  @ViewChild('services', { static: true }) services!: ElementRef;
  @ViewChild('projects', { static: true }) projects!: ElementRef;
  @ViewChild('contact', { static: true }) contact!: ElementRef;

  data: any = [
    // {
    //   image: 'assets/image/projects/barberia-El-Imperial.png',
    //   thumb: 'assets/image/projects/barberia-El-Imperial_thumb.png'
    // },
    {
      image: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      thumb: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
      image: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      thumb: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
      image: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      thumb: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    }
  ];

  galleryId = 'myLightbox';
  items: GalleryItem[] = this.data.map((item:any) =>
    new ImageItem({ src: item.image, thumb: item.thumb })
  );

  jsonItems = JSON.stringify(this.items);

  constructor(
    public gallery: Gallery,
    private lightbox: Lightbox
  ) { }

  ngOnInit(): void {
    // let items = this.data.map((item:any) =>
    //   this.items.push(
    //     new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
    //   )
    // );
    const galleryRef = this.gallery.ref(this.galleryId);
    galleryRef.load(this.items);

  }

  openInFullScreen(index: number) {
    this.lightbox.open(index, this.galleryId, {
      panelClass: 'fullscreen'
    });
  }

  /**
   * funcion para realizar la navegacion de scroll, escuchado por el app-component principal
   * @param id identificador que indica cual elemento debe seleccionar
   */
  scrollToElement(id: number): void {

    const home = this.home.nativeElement;
    const team = this.team.nativeElement;
    const services = this.services.nativeElement;
    const projects = this.projects.nativeElement;
    const contact = this.contact.nativeElement;

    let elem = id== 1 ? home : id == 2 ? team : id == 3 ? services : id == 4 ? projects : id == 5 ? contact : null;

    console.log('Element: ',elem);
    if(elem) {
      elem.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }
  }

}
