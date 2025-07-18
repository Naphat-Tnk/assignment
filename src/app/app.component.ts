export interface TaxData {
  Type: string;
  saleAmount: number;
  selectedYear: string;
  selectedMonth: string;
  vat: number;
  surchargeValue: number;
  penaltyValue: number;
  monthText?: string;
  totalAmount: number;
}

import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FilingTypeComponent } from './filing-type/filing-type.component';
import { MonthComponent } from './month/month.component';
import { YearComponent } from './year/year.component';
import { FormsModule } from '@angular/forms';
import { SaleAmountComponent } from './sale-amount/sale-amount.component';
import { TexAmountComponent } from './tex-amount/tex-amount.component';
import { SurchargeComponent } from './surcharge/surcharge.component';
import { PenaltyComponent } from './penalty/penalty.component';
import { TotalAmountComponent } from './total-amount/total-amount.component';
import { CommonModule } from '@angular/common';
import { TypeComponent } from './type/type.component';

@Component({
selector: 'app-root',
standalone: true,
imports: [FilingTypeComponent, MonthComponent, YearComponent, FormsModule,SaleAmountComponent,TexAmountComponent,
  SurchargeComponent, PenaltyComponent, TotalAmountComponent,CommonModule,TypeComponent
],
templateUrl: './app.component.html',
styleUrl: './app.component.css'
})
export class AppComponent {


@Output() taxDataChange = new EventEmitter<TaxData>();

filingType: string = '0';
filingtext: string = '';
title = 'assignment';
currentTime: string = '';
saleAmount: number = 0;
date: string = '';
vat: number = 0;
surchargeValue: number = 0;
penaltyValue: number = 0;
totalAmount: number = 0;
currentStep = 1;
monthText: string = '';
page = 1;
josonModal: any;

AdditionalFiling: boolean = false;


selectedYear: string = '';
selectedMonth: string = '';

taxData: TaxData | null = null;

onChangeYear(year: string) {
  console.log(year);
  this.selectedYear = year;
  this.validate();
}

saleAmountEvent(event: number) {
  this.saleAmount = event;

  this.vat= parseFloat((event * 0.07).toFixed(2));
}

penaltyValueEvent(penalty: number) {
  this.penaltyValue = penalty;
}


onChangeType(type: string) {
  this.filingType = type;
}

vatcal(vat: number) {
  this.vat = vat;
}

onSurcharge(surcharge: number) {
  this.surchargeValue = surcharge;
}

getMonthName(month: string): string {
  const monthNames: { [key: string]: string } = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };
  return monthNames[month] || month;
}


onChangeMonth(month: string) {
  console.log(month);
  this.selectedMonth = month;
  this.validate();
}

onTotalAmount(totalAmount: number) {
  this.totalAmount = totalAmount;
}

validate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  if (!this.selectedYear || !this.selectedMonth) {
    return;
  }
  if (this.selectedYear === year.toString() && this.selectedMonth > month.toString()) {
    alert('Cannot select future month in current year');
    this.selectedMonth = '';
    return;
  }
}

constructor(private router: Router) {
  this.updateTime();
  setInterval(() => this.updateTime(), 1000);
  this.setDate();
  setInterval(() => this.setDate(), 1000);
}

updateTime() {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit', minute: '2-digit',
      timeZone: 'Asia/Bangkok'
    };
    this.currentTime = new Intl.DateTimeFormat('th-TH', options).format(new Date());
  }

setDate(){
  const date = new Date();
  const day = date.getDate();
  const suffix = this.setday(day);

  const month = date.toLocaleString('en-GB', { month: 'long', timeZone: 'Asia/Bangkok' });
  const year = date.getFullYear();

  this.date = `${day}${suffix} ${month} ${year}`;
}

setday(day: number){
  if(day >= 11 && day <= 13){
    return 'th';
  }else if(day % 10 == 1){
    return 'st';
  }else if(day % 10 == 2){
    return 'nd';
  }else if(day % 10 == 3){
    return 'rd';
  }
  return 'th';
}

onBack() {
  this.selectedYear = '';
  this.selectedMonth = '';
  this.saleAmount = 0;
  this.vat = 0;
  this.surchargeValue = 0;
  this.penaltyValue = 0;
  this.totalAmount = 0;
  this.page = 1;
}


check(){
  console.log(this.filingType);
  console.log(this.selectedYear);
  console.log(this.selectedMonth);
  console.log(this.saleAmount);
  console.log(this.vat);
  console.log(this.surchargeValue);
  console.log(this.penaltyValue);
  console.log(this.totalAmount);
  if(this.filingType == '0'){
    if(this.selectedYear && this.selectedMonth && this.saleAmount && this.vat){
      this.filingtext = 'Ordinary Filing';
      return this.filingType && this.selectedYear && this.selectedMonth && this.saleAmount && this.vat;
    }
  }else if(this.filingType == '1'){
    if(this.selectedYear && this.selectedMonth && this.saleAmount && this.vat && this.surchargeValue && this.penaltyValue && this.totalAmount){
      this.filingtext = 'Additional Filing';
      return this.filingType && this.selectedYear && this.selectedMonth && this.saleAmount && this.vat && this.surchargeValue && this.penaltyValue && this.totalAmount;
    }
  }
  return false;
}


onNext() {
  if(this.check()){
    this.monthText = this.getMonthName(this.selectedMonth);
    this.taxData = {
      Type: this.filingType,
      saleAmount: this.saleAmount,
      selectedYear: this.selectedYear,
      selectedMonth: this.selectedMonth,
      vat: this.vat,
      surchargeValue: this.surchargeValue,
      penaltyValue: this.penaltyValue,
      totalAmount: this.totalAmount,
      monthText: this.monthText
    
    };
    this.page = 2;
  }else{
    alert('Please fill all the required fields');
  }
}
showJsonModal = false;
onConfirm() {
  if (this.check()) {
    this.taxData = {
      Type: this.filingType,
      saleAmount: this.saleAmount,
      selectedYear: this.selectedYear,
      selectedMonth: this.selectedMonth,
      vat: this.vat,
      surchargeValue: this.surchargeValue,
      penaltyValue: this.penaltyValue,
      totalAmount: this.totalAmount,
      monthText: this.monthText
    };
    this.showJsonModal = true;
  } else {
    alert('Please fill all the required fields');
  }
}
}
