import {Component, AfterViewInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import * as L from 'leaflet';

/**
 * following lines are written to prevent console.error for not founding shadow.png icon
 */
import { icon, Marker } from 'leaflet';
const iconRetinaUrl = 'assets/marker-icon-2x.png';
const iconUrl = 'assets/marker-icon.png';
const shadowUrl = 'assets/marker-shadow.png';
const iconDefault = icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});
Marker.prototype.options.icon = iconDefault;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Input() lat: number | undefined;
  @Input() long: number | undefined;
  private map: any;
  private marker: unknown;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lat']?.currentValue || changes['long']?.currentValue){
      const lat = changes['lat']?.currentValue || this.lat;
      const long = changes['long']?.currentValue || this.long;
      this.setNewMarker(lat, long);
    }
  }

  private setNewMarker(lat: number, long: number): void{
    this.marker && this.map.removeLayer(this.marker);
    this.map.panTo(new L.LatLng(lat, long));
    this.marker = L.marker([lat, long]).addTo(this.map);
  }
}
