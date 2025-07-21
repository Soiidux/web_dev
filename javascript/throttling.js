//  THROTTLING: Throttling is a performance optimization technique that limits how frequently a function can be executed over a
//  specified period of time. When a throttled function is invoked repeatedly—such as during scrolling, resizing, or frequent button
//  clicks—it will only execute at most once within the defined time interval, regardless of how many times it was triggered during
//  that span.


//Real life comparision     :Suppose a girl is asking her mother for a chocolate but the mother tells her that she can get it only
//for easy understanding    :after 5 minutes. Even if she makes multiple requests for chocolate before the 5 minute timer is finished
//                           it won't matter as she will receive chocolate only and only after the timer is over.
//                  

//Real life use     : For example, lets say there is a button for form submission, making api calls, or running a code in a code space
//                    we dont want that multiple submissions or calls are made at a time as it wastes both time and slows the program.
//                    So we use throttling


function throttle(fn,delay){
    let lastTime = 0;
    return function(...args){
        const now = Date.now();
        if(now-lastTime <=delay){
            return;
        }
        else{
            lastTime=now;
            return fn(...args);
        }
    }
}

function log(message){
    console.log(message);
}

const throttled_log = throttle(log,1000);


throttled_log("Hi");
throttled_log("Hi again");
throttled_log("Hellooo");
throttled_log("soiidux");
setTimeout(()=>throttled_log("Hi again after 2s"),2000);
