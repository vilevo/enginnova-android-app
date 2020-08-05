import { Injectable } from '@angular/core';
import { MemberModel } from 'src/app/models/member-model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {


  constructor() { }


  public toBody(data: MemberModel) {
    // console.log('To body called');
    const body = {
      id: data.id,
      last_name: data.lastName,
      username: data.username,
      phone_number: data.phoneNumber,
      job: data.job,
      enterprise: data.enterprise,
      biography: data.biography,
      quarter: data.quarter,
      competencies: data.competencies,
      // image: data.image || null,
      first_name: data.firstName,

      email: data.email,
      // linkedin: data.linkedin,
      // twitter: data.twitter,
      // facebook: data.facebook,
      // website: data.website,
      interests: data.interests
    };
    if (data.twitter) {
      body['twitter'] = data.twitter;
    }
    if (data.linkedin) {
      body['linkedin'] = data.linkedin;
    }
    if (data.facebook) {
      body['facebook'] = data.facebook;
    }
    if (data.website) {
      body['website'] = data.website;
    }
    if (data.birthDate) {
      body['birthDate'] = data.birthDate;
    }

    return body;
  }

  public toMemberModel(body) {
    // console.log('To member model called');

    const data = new MemberModel();
    data.id = body.id;
    data.lastName = body.last_name;
    data.username = body.username;
    data.phoneNumber = body.phone_number;
    data.job = body.job;
    data.enterprise = body.enterprise;
    data.biography = body.biography;
    data.quarter = body.quarter;
    data.competencies = new Array();
    if (body.competencies) {
      data.competencies = body.competencies;
    }
    if (body.image) {
      data.image = body.image;
    }
    data.firstName = body.first_name;
    if (body.birth_date) {
      data.birthDate = this.toDate(body.birth_date);
    }
    data.email = body.email;
    data.linkedin = body.linkedin;
    data.twitter = body.twitter;
    data.facebook = body.facebook;
    data.website = body.website;
    data.interests = body.interests;
    data.interests = new Array();
    if (body.interests) {
      data.interests = body.interests;
    }

    return data;
  }

  toListMemberModel(body): Array<MemberModel> {
    console.log('The body we received');
    console.log(body);
    const array = [];
    console.warn('Alert body.data if you deploy, check it');
    body.data.forEach(model => {
      array.push(this.toMemberModel(model));
    });

    return array;
  }

  fakeMember(): MemberModel {
    return this.toMemberModel({
      last_name: 'Fake',
      username: 'Member',
      phone_number: '90334435',
      job: 'Testing',
      enterprise: 'Custom',
      biography: ' ',
      quarter: 'Agoe Atchanve',
      competencies: [
        'Design',
        'Piano',
      ],
      image: null,
      first_name: 'Ange',
      birth_date: this.toDate('12-12-2000'),
      email: 'fourange7@gmail.com',
      facebook: 'm.me/angelo.amennou',
      linkedin: 'linkedin.com/angelo.amenou',
      twitter: 'tw.me/angelo.amemnou',
      website: 'www.genesis.com',
      interests: [
        'Music'
      ],
      id: 29
    });
  }

  toDate(date: string) {
    console.log('Convert to date this');
    console.log(date);
    if (date && date.length) {
      const d = new Date(date);
      return d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

    }
    return 'nooooo';
  }

  getCacheHeader(): HttpHeaders {
    const h = new HttpHeaders();
    h.set('CanCache', 'true');
    return h;
  }

  getCacheHeaderLabel() {
    return 'CanCache';
  }

  contains(a: Array<string>, value: string) {
    return a.indexOf(value) >= 0;
  }

  allOfIn(a: Array<string>, b: Array<string>) {
    return a.filter(v => {
      return this.contains(b, v);
    });
  }

  allOfNotIn(a: Array<string>, b: Array<string>) {
    return a.filter(v => {
      return !this.contains(b, v);
    });
  }

  getSimilar(a: Array<string>, b: Array<string>) {
    if (a.length > b.length) {
      return this.allOfIn(a, b);
    } else if (a.length < b.length) {
      return this.allOfIn(b, a);
    }
    return this.allOfIn(a, b);
  }

  getNotSimilar(a: Array<string>, b: Array<string>) {
    if (a.length > b.length) {
      return this.allOfNotIn(a, b);
      // } else if (a.length < b.length) {
      //   return this.allOfNotIn(b, a);
      // }
      // return this.allOfNotIn(a, b);

    }
    return [];
  }
}
