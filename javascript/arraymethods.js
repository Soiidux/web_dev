// Make an expense report for the following data using array functions
let expenses=[
    {description:"Groceries", amount: 50, category: "Food"},
    {description:"Electricity Bill", amount: 100, category: "Utilities"},
    {description:"Dinner", amount: 30, category: "Food"},
    {description:"Internet Bill", amount: 50, category: "Utilities"}
]

let expenseReport = expenses.reduce((report,expense) => {
    if(report[expense.category]==undefined){
        report[expense.category]=0;
    }
    report[expense.category]+=expense.amount;
    return report
},{})


console.log(expenseReport);


//Make an array which contains pending tasks in the order of priority
let tasks = [
    {description:"Write report", completed: false, priority:2},
    {description:"Send Email", completed: true, priority:3},
    {description:"Prepare Presentation", completed: false, priority:1}
]

let pendingSortedTasks = tasks.filter((task) => task.completed === false).sort((a,b) => a.priority-b.priority);
console.log(pendingSortedTasks);

//Make an array with avg movie ratings
let movieRatings=[
    { title: "Movie A" , ratings: [4,5,3]},
    { title: "Movie B" , ratings: [5,5,4]},
    { title: "Movie C" , ratings: [3,4,2]}
]

let AvgmovieRatings= movieRatings.reduce((avg,currentmovie) => {
    if(!(avg[currentmovie.title])){
        avg[currentmovie.title] = currentmovie.ratings.reduce((accumulator,currentrating) => 
            accumulator += currentrating,0) / currentmovie.ratings.length
    }
    return avg;
},{})

console.log(AvgmovieRatings);