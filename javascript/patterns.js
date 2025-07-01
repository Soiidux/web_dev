function pyramid1(n){
    for(let i=1; i<n+1;i++){
        let string=""
        for(let j=1;j<i+1;j++){
            string+="*"
        }
        console.log(string);
        
    }
}
// pyramid1(5);


function pyramid2(n){
    for(let i=1;i<n+1;i++){
        let string=""
        for(let j=0;j<n-i+1;j++){
            string+="*";
        }
        console.log(string);
    }

}

// pyramid2(5);

function pyramid3(n){
    for(let i=0;i<n;i++){
        let string=""
        for(let j=1;j<i+2;j++){
            string+=j;
        }
        console.log(string);
    }
}
// pyramid3(5);

function pyramid4(n){
    for(let i=1;i<2*n;i++){
        let string=""
        let columns= i<=5? i:2*n-i;
        for(let j=0;j<columns;j++){
            string+="*";
        }
        console.log(string);
    }
}

// pyramid4(6);

function pyramid5(n) {
    for(let i=1;i<2*n;i++){
      let noOfSpaces = i<=n? n-i:i-n;
      let string="";
      let noOfStars = (2*n-1)-2*noOfSpaces
      for(let j=0;j<noOfSpaces;j++){
        string+=" "
      }
      for(let k=0;k<noOfStars;k++){
        string+="*";
      }
      console.log(string);
    }
  }
// pyramid5(4);

function pyramid6(n){
    for (let i = 1; i < n+1; i++) {
        let string=""
        let noOfSpaces=n-i;
        for(let l=0;l<noOfSpaces;l++){
            string+=" ";
        }
        for(let j=i;j>0;j--){
            string+=j;
        }
        for(let k=2;k<i+1;k++){
            string+=k;
        }
        console.log(string);
    }
}

pyramid6(5);