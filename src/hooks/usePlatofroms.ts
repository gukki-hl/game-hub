import usePlatform from "./usePlatform";

const usePlatofroms = (id?: number) => {
  const { data: platforms } = usePlatform();
  return platforms?.results.find((p) => p.id === id);
};

export default usePlatofroms;
