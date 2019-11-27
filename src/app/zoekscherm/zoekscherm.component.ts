import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ZoekopdrachtService } from '../services/zoekopdracht.service';
import { Zoekopdracht } from '../model/zoekopdracht';
import { Website } from '../model/website';
import { WebsiteService } from '../services/website.service';

@Component({
  selector: 'app-zoekscherm',
  templateUrl: './zoekscherm.component.html',
  styleUrls: ['./zoekscherm.component.scss']
})
export class ZoekschermComponent implements OnInit {
  zoekform: FormGroup;
  status: boolean[] = [true, false, false];
  zoekopdracht: Zoekopdracht = new Zoekopdracht;
  websites: Website[];


  constructor(private fb: FormBuilder, private zoekopdrachtService: ZoekopdrachtService, private websiteService:WebsiteService) {
    this.zoekform = fb.group({
      website:  ['', Validators.required],
      zoekterm: ['', Validators.required]
    });
    this.websitesOphalen();
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
      },
      (error) => {
        this.zoekform.reset();
        this.status[1] = false;
        this.status[0] = true;
      });
    }
  }

  zieResultaten(): void {
    alert("Werkt niet ;)");
  }

  websitesOphalen(){
    this.websiteService.geefAlleWebsites().subscribe(websiteLijst => {
      this.websites = websiteLijst;
    });
  }
}

