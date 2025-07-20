import useData from "./useData";
interface Platforms{
    id:number;
    name:string,
    slug:string,
}

const usePlatform = () => useData<Platforms>('/platforms/lists/parents')
export default usePlatform;
