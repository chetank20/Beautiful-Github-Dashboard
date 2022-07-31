import { items } from 'fusioncharts';
import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
 
 
  const language =repos.reduce((total,item)=>{
    const{language,stargazers_count}=item
  
    if(!language) return total;
    if(!total[language]){
    total[language]={label:language,value:1,stars: stargazers_count};
    }
    else
    total[language]={...total[language],
      value:total[language].value+1,
      stars:total[language].stars+stargazers_count};
    
    return total;
  },{})
  //sort the values so that the most use langugage come to top

  //most use langugage
  const mostUse=Object.values(language).sort((a,b)=>{
    return b.value-a.value;
  }).slice(0,5);


  //most star per langugage

  const mostPopular=Object.values(language).sort((a,b)=>{
    return b.value-a.value;
  }).map((items)=>{
return {...items,value:items.stars}
  }).slice(0,5);

  //stars and forks

  let {stars,forks}=repos.reduce((total,item)=>{
    const {stargazers_count,name, forks}=item;
    total.stars[stargazers_count]={label:name,value:stargazers_count};
    total.forks[forks]={label:name,value:forks};
    return total;
  },{
    stars:{},
    forks:{},
  });

  stars=Object.values(stars).slice(-5).reverse();
  forks=Object.values(forks).slice(-5).reverse();
  
  const chartData = [
    {
      label: "Venezuela",
      value: "290"
    },
    {
      label: "Saudi",
      value: "260"
    },
    {
      label: "Canada",
      value: "180"
    }
  ];
  
  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D data={mostUse}/>
      <Column3D data={stars}/>
      <Doughnut2D data={mostPopular}/>
      <Bar3D data={forks}/>
    </Wrapper>
  </section>

  
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
