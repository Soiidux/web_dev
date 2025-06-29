// marks -- grade 
// 90>= -- A
// 80>= -- B 
// 70>= -- C 
// 60>= -- D 
// F

function calculateGrade(score){
    let grade;
    if(score>=90){
        grade="A";
    }
    else if(score>=80){
        grade="B";
    }
    else if(score>=70){
        grade="C";
    }
    else if(score>=60){
        grade="D";
    }
    else{
        grade="F";
    }
    console.log(`Your grade is: ${grade}`);
}

calculateGrade(97);
