import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZoekopdrachtService } from '../services/zoekopdracht.service';
import { Zoekopdracht } from '../model/zoekopdracht';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  zoekform: FormGroup;
  status: boolean[] = [true, false, false];
  zoekopdracht: Zoekopdracht = new Zoekopdracht;

  constructor(private fb: FormBuilder, private zoekopdrachtService: ZoekopdrachtService) {
    this.zoekform = fb.group({
      website:  ['', Validators.required],
      zoekterm: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  zoeken(): void {
    const val = this.zoekform.value;

    if (val.website && val.zoekterm) {
      this.status[0] = false;
      this.status[1] = true;

      this.zoekopdracht.website = val.website;
      this.zoekopdracht.zoekterm = val.zoekterm;

      this.zoekopdrachtService.crawlWebsite(this.zoekopdracht).subscribe(response => {
        this.status[1] = false;
        this.status[2] = true;
      })
      // (error) => {
      //   this.zoekform.reset();
      //   this.status[1] = false;
      //   this.status[0] = true;
      // });
    }
  }

  nieuweZoekopdracht(): void {
    
  }

  zieResultaten(): void {
    alert("Werkt niet ;)");
  }
}
