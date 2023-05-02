import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  cityData: any;
  activeCity: any;
  searchTerm: any;
  activeTab: any;
  activeTabData: any;
  showDropDown: any = false;

  constructor(private http: HttpClient) {
    this.http
      .get(
        'https://codejudge-question-artifacts-dev.s3.amazonaws.com/q-1458/data.json'
      )
      .subscribe((res) => {
        this.cityData = res;
        console.log('--- result :: ', this.cityData);
        this.activeCity = this.cityData[0];
        this.activeTabData = this.cityData[0].categories.places;
        console.log(
          '🚀 ~ file: app.component.ts:26 ~ AppComponent ~ .subscribe ~ this.activeTabData:',
          this.activeTabData
        );
      });
  }
  filterCity() {
    if (this.searchTerm == '') {
      this.activeCity = this.cityData[0];
      this.showDropDown = false;
    }
    let filteredCities = this.cityData.filter((city: any) =>
      city.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
    if (filteredCities) {
      this.activeCity = filteredCities[0];
      this.showDropDown = true;
    }
  }
  searchCity() {
    this.filterCity();
    this.searchTerm = this.activeCity.name;
  }
  setActiveTab(cityItems: any) {
    console.log(
      '🚀 ~ file: app.component.ts:42 ~ AppComponent ~ setActiveTab ~ cityItems:',
      cityItems
    );
    this.activeTabData = cityItems;
    this.activeTab = this.activeTabData.name;
    console.log(this.activeTabData);
  }
}
