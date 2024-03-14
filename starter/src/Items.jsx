import { useQuery } from '@tanstack/react-query';

import SingleItem from './SingleItem';
import customFetch from './customFetch';

const Items = ({ items }) => {
  const {isLoading,isError,data} = useQuery({
    queryKey:["tasks"],
    queryFn: async ()=>{
      const{data}=await customFetch("/")
      return data
    }
  })

  if(isLoading){
    return <p className='loading'></p>
  }
  if(isError){
    return <p className='error'>error</p>
  }
 
  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
