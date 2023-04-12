import { Component, OnInit, AfterViewInit, ViewContainerRef, Inject  } from '@angular/core';
import { ModalDialogService } from 'ngx-modal-dialog';
import { MovieDatasService } from 'src/app/services/movie-datas.service'; 
import { BookMovieComponent } from '../book-movie/book-movie.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})

export class MovieListComponent implements OnInit {

  public movieListContainer: Array<any> = [];
  public customImage:string='../../../assets/images/cinema.jpg';

  constructor(private movieService: MovieDatasService,public dialog: MatDialog) {}

  ngOnInit(): void {
    const emailAddress = "aasifammar@gmail.com"
    localStorage.setItem('email', emailAddress);

    const emailValue = localStorage.getItem('email')

    const sendRequest = {
      "user_mail_id": emailValue
    }

    this.movieService.getMoviesList(sendRequest).subscribe((result: any) => {
      //console.log(result)
      this.movieListContainer = result.theatre;
    });


  }
 
  onDisplayMovieDetail(data: any) {
    const dialogRef = this.dialog.open(BookMovieComponent, {
      width: '900px',
      panelClass: 'movie-modalbox',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
 
} 