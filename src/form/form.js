import React, { useEffect, useState } from 'react'
import "./form.css"

function Form(x) {
    let [rn,setRn]=useState();
    let [name,setName]=useState();
    let [branch,setBranch]=useState();
    let [year,setYear]=useState();
    let [place,setPlace]=useState();
    let [details,setDetails]=useState([]);

    // setId(x.proId);
    useEffect(()=>{
        fetch(`http://localhost:3003/students/${x.proId}`)
        .then((res) => res.json())
        .then((json) =>{
          // console.log(json);
          setDetails(json);
        })
      },[x.proId]);

      useEffect(()=>{
        setName(details.name);
        setRn(details.rollNo);
        setBranch(details.branch);
        setYear(details.year);
        setPlace(details.place);
      },[details])

    function i1(e){
        setRn(e.target.value);
        console.log(rn);
    }
    function i2(e){
        setName(e.target.value);
    }
    function i3(e){
        setBranch(e.target.value);
    }
    function i4(e){
        setYear(e.target.value);
    }
    function i5(e){
        setPlace(e.target.value);
    }
    function sub(e){
        // e.preventDefault();
        if(typeof name==="string" && typeof branch==="string" && typeof rn==="string" && year.length===4 && typeof place==="string"){
            var obj={
                "id":details.id,
                "name": name,
                "branch": branch,
                "rollNo":rn,
                "year": year,
                "place":place
            }
            x.prop(obj);
        }
        else{
            e.preventDefault();
            if(typeof name!=="string" || typeof branch!=="string" || typeof rn!=="string" || typeof year!=="string" || typeof place!=="string"){
                console.log("1");
                var ins=document.querySelectorAll("input");
                ins.forEach(function(x){
                    if(x.value===""){
                        x.style.border="2px solid red"
                    }
                    else{
                        x.style.border="2px solid black"
                    }
                })
            }
            else{
                // var ins=document.querySelectorAll("input");
                // ins.forEach(function(x){
                //     x.style.border="2px solid red"
                // })
            }
        }
    }
  return (
    <div>
        <form onSubmit={sub}>
            <div>
                <input type='text' onChange={i2} placeholder='Name' value={name} id='name'/>
                {name==="" && <p>*Pleace enter the name</p>}
            </div>
            <div>
                <input type='text' onChange={i3} placeholder='Branch' value={branch} id='branch'/>
                {branch==="" && <p>*Pleace enter the branch</p>}
            </div>
            <div>
                <input type='text' onChange={i1} placeholder='Roll Number' value={rn} id='rn'/>
                {rn==="" && <p>*Pleace enter the Roll Number</p>}
            </div>
            <div>
                <input type='text' onChange={i4} placeholder='Year' value={year} id='year'/>
                {year==="" && <p>*Pleace enter the year</p>}
            </div>
            <div>
                <input type='text' onChange={i5} placeholder='Native' value={place} id='place'/>
                {place==="" && <p>*Pleace enter the native</p>}
            </div>
            <div>
                <button>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Form