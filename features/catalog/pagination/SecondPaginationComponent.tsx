import {
Pagination,
PaginationContent,
PaginationItem,
PaginationLink,
PaginationNext,
PaginationPrevious
}
from "@/components/ui/pagination";



type Props={

currentPage:number;

totalPages:number;

searchParams:{
[key:string]:string | undefined
};

}



export default function SecondPaginationComponent({

currentPage,

totalPages,

searchParams

}:Props){



function createUrl(page:number){


const params =
new URLSearchParams();



Object.entries(searchParams)
.forEach(([key,value])=>{


if(value){

params.set(key,value);

}


});



params.set(
"page",
page.toString()
);



return `/products?${params.toString()}`;


}




let startPage =
Math.max(1,currentPage-1);


let endPage =
Math.min(totalPages,currentPage+1);



if(currentPage===1){

endPage=Math.min(3,totalPages);

}



if(currentPage===totalPages){

startPage=Math.max(totalPages-2,1);

}



return (

<Pagination>

<PaginationContent>



{
currentPage > 1 &&

<PaginationItem>

<PaginationPrevious

href={createUrl(currentPage-1)}

/>

</PaginationItem>

}




{
Array.from(
{
length:endPage-startPage+1
},

(_,i)=>startPage+i

)
.map(page=>(


<PaginationItem key={page}>


<PaginationLink

href={createUrl(page)}

isActive={
page===currentPage
}

>

{page}

</PaginationLink>


</PaginationItem>


))

}




{
currentPage < totalPages &&

<PaginationItem>

<PaginationNext

href={createUrl(currentPage+1)}

/>

</PaginationItem>

}




</PaginationContent>


</Pagination>


)

}