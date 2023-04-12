import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../movie-list/movie-list.component';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'; 
import { MatCheckboxChange } from "@angular/material/checkbox";
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment'; 
import { MovieDatasService } from 'src/app/services/movie-datas.service';

@Component({
  selector: 'app-book-movie',
  templateUrl: './book-movie.component.html',
  styleUrls: ['./book-movie.component.scss']
})
export class BookMovieComponent implements OnInit {
  
  public movieDetail: any;
  public myForm: FormGroup | any;movieSeats: any;selected: any;

  constructor(
    public dialogRef: MatDialogRef<BookMovieComponent>,
    public movieService: MovieDatasService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder ) {}
 
    ngOnInit(): void { 

      this.movieDetail = this.data;  

      this.myForm = this.fb.group({ 
        movieShowTime: new FormControl(Validators.required), 
        movieShowName: new FormControl(Validators.required),
        movieBookedDate: new FormControl(Validators.required),
        movieSeats: this.fb.array([],Validators.required)
      });

      this.movieSeats = [];

      for (let i=1; i<=100; i++) {
        this.movieSeats.push({name: i ,abbreviation: i})
      }

    }

    closeDialog() {
      this.dialogRef.close();
    }

    onChange(selectedOption: MatCheckboxChange) {
      const movieSeats = (<FormArray>(
        this.myForm.get("movieSeats")
      )) as FormArray;
  
      if (selectedOption.checked) {
        movieSeats.push(new FormControl(selectedOption.source.value));
      } else {
        const i = movieSeats.controls.findIndex(
          x => x.value === selectedOption.source.value
        );
        movieSeats.removeAt(i);
      }
    }

    onSubmit() { 
      const emailValue = localStorage.getItem('email');
      const timeValue = this.myForm.get('movieShowTime').value;
      const convertDate = this.myForm.get('movieBookedDate').value;
      const dateValue = moment(convertDate).format('DD/MM/YYYY')
      const movieValue = this.myForm.get('movieShowName').value;
      const theaterName = this.movieDetail.theatre_name;
      const bookedSeats = this.myForm.get('movieSeats').value;
      bookedSeats.sort(function(a: any, b: any) {
        return a - b;
      });
      
      const sendBookedDetails = {
        "show_time": timeValue,
        "movie_name": movieValue,
        "theatre_name": theaterName,
        "booked_seats": bookedSeats,
        "date": dateValue,
        "user_mail_id": emailValue,
      } 

        this.movieService.bookMovieSeats(sendBookedDetails).subscribe((res: any) => {
          this.toastr.success(res.message);
          setTimeout(() => {
            window.location.reload();
          }, 2000); 
        }); 
    }
}
