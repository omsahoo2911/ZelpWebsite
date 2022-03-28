
class FluentRestaurants{

 constructor(jsonData) {
   this.data = jsonData;
 }

 filter(f){
   return new FluentRestaurants(this.data.filter(f));
 }
 //fromState(stateStr: string): FluentRestaurants
 fromState(stateStr){
   return this.filter(r =>  lib220.getProperty(r, 'state').found && lib220.getProperty(r, 'state').value === stateStr);
 }

 //ratingLeq(rating: number): FluentRestaurants
 ratingLeq(rating){
   return this.filter(r => lib220.getProperty(r, 'stars').found && lib220.getProperty(r, 'stars').value <= rating);
 }

 //ratingGeq(rating: number): FluentRestaurants
 ratingGeq(rating){
   return this.filter(r => lib220.getProperty(r, 'stars').found && lib220.getProperty(r, 'stars').value >= rating);
 }

 //category(categoryStr: string): FluentRestaurants
 category(categoryStr){
   return this.filter(r => lib220.getProperty(r, 'categories').found && lib220.getProperty(r, 'categories').value.some(c => c === categoryStr));
 }

 //hasAmbience(ambienceStr: string): FluentRestaurants
 hasAmbience(ambienceStr){
   return this.filter(r => lib220.getProperty(r, 'attributes').found  && lib220.getProperty(r.attributes, 'Ambience').found && lib220.getProperty(lib220.getProperty(r.attributes, 'Ambience').value, ambienceStr).found &&lib220.getProperty(lib220.getProperty(r.attributes, 'Ambience').value, ambienceStr).value);
 }

 //bestPlace(): Restaurant | {}
 bestPlace(){
   if (this.data.every(r => !lib220.getProperty(r, 'stars').found)){
     return {};
   } else {
   return this.data.reduce((best, r) => {
     if(lib220.getProperty(r, 'stars').found){
      if (lib220.getProperty(r, 'stars').value > lib220.getProperty(best, 'stars').value){
        best = r;
      }
      else if (lib220.getProperty(r, 'stars').value === lib220.getProperty(best, 'stars').value){
        if(lib220.getProperty(r, 'review_count').found && lib220.getProperty(best, 'review_count').found){
          if(lib220.getProperty(r, 'review_count').value > lib220.getProperty(best, 'review_count').value){
            best = r;
          }
        } else if (!lib220.getProperty(best, 'review_count').found){
          best = r;
        }
      }
      return best;
    } else {
     return best;
    }
   }, this.data.find(x => lib220.getProperty(x, 'stars').found));
  }
 }

 //mostReviews(): Restaurant | {}
 mostReviews(){
   if (this.data.every(r => !lib220.getProperty(r, 'review_count').found)){
     return {};
   } else {
   return this.data.reduce((best, r) => {
     if (lib220.getProperty(r, 'review_count').found){
      if (lib220.getProperty(r, 'review_count').value > lib220.getProperty(best, 'review_count').value){
        best = r;
      }
      else if (lib220.getProperty(r, 'review_count').value === lib220.getProperty(best, 'review_count').value){
        if(lib220.getProperty(r, 'stars').found && lib220.getProperty(best, 'stars').found){
          if(lib220.getProperty(r, 'stars').value > lib220.getProperty(best, 'stars').value){
            best = r;
          }
        } else if (!lib220.getProperty(best, 'stars').found){
          best = r;
        }
      }
      return best;
     } else {
      return best;
     }
   }, this.data.find(x => lib220.getProperty(x, 'review_count').found));
  }
 }
}

const testData = [
{
 name: "Applebee's",
 state: "NC",
 stars: 4,
 review_count: 6,
 categories: [
      "Shopping",
      "Shopping Centers"
    ],
  attributes: {
    Ambience: {
      hipster: true,
      trendy: true,
      upscale: false,
      casual: false
      } 
    }
 },
 {
 name: "China Garden",
 state: "NC",
 stars: 4,
 review_count: 10,
  attributes: {
    Ambience: {
      hipster: true,
      trendy: false,
      upscale: false,
      casual: false
      } 
    }
 },
 {
 name: "Beach Ventures Roofing",
 state: "AZ",
 stars: 3,
 review_count: 30,
 categories: [
      "Shopping",
      "Food"
    ],
  attributes: {}
 },
 {
 name: "Alpaul Automobile Wash",
 state: "NC",
 stars: 3,
 review_count: 30,
 categories: [
      "Soul Food",
      "Food"
    ]
 }
];

test('fromState case 1 : normal case', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.fromState('NC').data;
 assert(list.length === 3);
 assert(list[0].name === "Applebee's");
 assert(list[1].name === "China Garden");
 assert(list[2].name === "Alpaul Automobile Wash");
});

test('fromState case 2: no such state exists', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.fromState('MA').data;
 assert(list.length === 0);
});

test('fromState case 3: empty array', function() {
 let tObj = new FluentRestaurants([]);
 let list = tObj.fromState('NC').data;
 assert(list.length === 0);
});


test('ratingLeq case 1: normal case', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.ratingLeq(3).data;
 assert(list.length === 2);
 assert(list[0].name === "Beach Ventures Roofing");
 assert(list[1].name === "Alpaul Automobile Wash");
});

test('ratingLeq case 2: no such rating exists', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.ratingLeq(2).data;
 assert(list.length === 0);
});

test('ratingLeq case 3: empty array', function() {
 let tObj = new FluentRestaurants([]);
 let list = tObj.ratingLeq(3).data;
 assert(list.length === 0);
});


test('ratingGeq case 1: normal case', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.ratingGeq(4).data;
 assert(list.length === 2);
 assert(list[0].name === "Applebee's");
 assert(list[1].name === "China Garden");
});

test('ratingGeq case 2: no such rating exists', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.ratingGeq(5).data;
 assert(list.length === 0);
});

test('ratingGeq case 3: empty array', function() {
 let tObj = new FluentRestaurants([]);
 let list = tObj.ratingGeq(4).data;
 assert(list.length === 0);
});

test('category case 1: normal case', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.category("Shopping").data;
 assert(list.length === 2);
 assert(list[0].name === "Applebee's");
 assert(list[1].name === "Beach Ventures Roofing");
});

test('category case 2: no such category exists', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.category("Sandwiches").data;
 assert(list.length === 0);
});

test('category case 3: empty array', function() {
 let tObj = new FluentRestaurants([]);
 let list = tObj.category("Shopping").data;
 assert(list.length === 0);
});

test('hasAmbience case 1: normal case', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.hasAmbience("hipster").data;
 assert(list.length === 2);
 assert(list[0].name === "Applebee's");
 assert(list[1].name === "China Garden");
 let list2 = tObj.hasAmbience("trendy").data;
 assert(list2.length === 1);
 assert(list2[0].name === "Applebee's");
});

test('hasAmbience case 2: no such ambience exists', function() {
 let tObj = new FluentRestaurants(testData);
 let list = tObj.hasAmbience("romantic").data;
 assert(list.length === 0);
});

test('hasAmbience case 3: empty array', function() {
 let tObj = new FluentRestaurants([]);
 let list = tObj.hasAmbience("hipster").data;
 assert(list.length === 0);
});

const caseFiveData = [
 {
 name: "Applebee's"
 },
 {
 name: "China Garden"
 },
 {
 name: "Beach Ventures Roofing"
 },
 {
 name: "Alpaul Automobile Wash"
 }
];

test('bestPlace case 1: One resturant has the highest rating', function() {
  let tempData = [
{
 name: "Applebee's",
 stars: 4
 },
 {
 name: "China Garden",
 stars: 2
 },
 {
 name: "Beach Ventures Roofing"
 },
 {
 name: "Alpaul Automobile Wash",
 stars: 3
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.bestPlace().name === "Applebee's");
});

test('bestPlace case 2: Two resturants have the highest rating but different reviews', function() {
  let tempData = [
 {
 name: "Applebee's",
 stars: 4,
 review_count: 30
 },
 {
 name: "China Garden",
 stars: 4,
 review_count: 35
 },
 {
 name: "Beach Ventures Roofing"
 },
 {
 name: "Alpaul Automobile Wash",
 stars: 3,
 review_count: 5
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.bestPlace().name === "China Garden");
});

test('bestPlace case 3: Two resturants have the highest rating but only one has a review count', function() {
  let tempData = [
 {
 name: "Applebee's",
 stars: 4
 },
 {
 name: "China Garden",
 stars: 4,
 review_count: 35
 },
 {
 name: "Beach Ventures Roofing",
 stars: 1,
 review_count: 24
 },
 {
 name: "Alpaul Automobile Wash",
 stars: 3,
 review_count: 5
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.bestPlace().name === "China Garden");
});

test('bestPlace case 4: Two resturants have the highest rating and the same number of reviews', function() {
  let tempData = [
 {
 name: "Applebee's",
 stars: 4,
 review_count: 35
 },
 {
 name: "China Garden",
 stars: 4,
 review_count: 35
 },
 {
 name: "Beach Ventures Roofing",
 stars: 1,
 review_count: 24
 },
 {
 name: "Alpaul Automobile Wash",
 stars: 3,
 review_count: 5
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.bestPlace().name === "Applebee's");
});

test('bestPlace case 5: None of the resturants have a star rating', function() {
 let tObj = new FluentRestaurants(caseFiveData);
 let o = tObj.bestPlace();
 assert(Object.keys(o).length === 0);
});

test('bestPlace case 6: Empty Array', function() {
 let tObj = new FluentRestaurants([]);
 let o = tObj.bestPlace();
 assert(Object.keys(o).length === 0);
});

test('mostReviews case 1: One resturant has the highest number of reviews', function() {
  let tempData = [
 {
 name: "Applebee's",
 review_count: 5
 },
 {
 name: "China Garden",
 review_count: 55
 },
 {
 name: "Beach Ventures Roofing",
 review_count: 35
 },
 {
 name: "Alpaul Automobile Wash"
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.mostReviews().name === "China Garden");
});

test('mostReviews case 2: Two resturants have the highest reviews but different ratings', function() {
  let tempData = [
 {
 name: "Applebee's",
 stars: 5,
 review_count: 35
 },
 {
 name: "China Garden",
 stars: 4,
 review_count: 35
 },
 {
 name: "Beach Ventures Roofing",
 stars: 1,
 review_count: 24
 },
 {
 name: "Alpaul Automobile Wash"
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.mostReviews().name === "Applebee's");
});

test('mostReviews case 3: Two resturants have the highest reviews but only one has a rating', function() {
  let tempData = [
 {
 name: "Applebee's"
 },
 {
 name: "China Garden",
 review_count: 35
 },
 {
 name: "Beach Ventures Roofing",
 stars: 1,
 review_count: 35
 },
 {
 name: "Alpaul Automobile Wash",
 stars: 3,
 review_count: 5
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.mostReviews().name === "Beach Ventures Roofing");
});

test('mostReviews case 4: Two resturants have the highest reviews and the same rating', function() {
  let tempData = [
 {
 name: "Applebee's"
 },
 {
 name: "China Garden",
 stars: 4,
 review_count: 35
 },
 {
 name: "Beach Ventures Roofing",
 stars: 3,
 review_count: 55
 },
 {
 name: "Alpaul Automobile Wash",
 stars: 3,
 review_count: 55
 }
];
 let tObj = new FluentRestaurants(tempData);
 assert(tObj.mostReviews().name === "Beach Ventures Roofing");
});

test('mostReviews case 5: None of the resturants have any reviews', function() {
 let tObj = new FluentRestaurants(caseFiveData);
 let o = tObj.mostReviews();
 assert(Object.keys(o).length === 0);
});

test('mostReviews case 6: Empty array', function() {
 let tObj = new FluentRestaurants([]);
 let o = tObj.mostReviews();
 assert(Object.keys(o).length === 0);
});
