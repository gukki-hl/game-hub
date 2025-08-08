import {create} from "zustand";

// 定义查询参数的类型
interface GameQuery {
    genreId?: number;
    platformId?: number;
    sortOrders?: string;
    searchText?: string;
}

// Zustand store 的类型定义
interface GameQueryStore {
    gameQuery: GameQuery,
    setSearchText: (searchText: string) => void,
    setSortOrders: (sortOrders: string) => void,
    setGenreId: (genreId: number) => void,
    setPlatformId: (platformId: number) => void,
}

// 创建 Zustand 状态管理
const useGameQeuryStore = create<GameQueryStore>(set => ({
    gameQuery: {},
    // 设置搜索文本（覆盖 gameQuery）
    setSearchText: (searchText) => set(() => ({gameQuery: {searchText}})),
    // 设置 sortOrder（保留原有其他字段）
    setSortOrders: (sortOrders) => set((store => ({gameQuery: {...store.gameQuery, sortOrders}}))),
    // 设置 genreId（保留原有其他字段）
    setGenreId: (genreId) => set((store => ({gameQuery: {...store.gameQuery, genreId}}))),
    // 设置 platformId（保留原有其他字段）
    setPlatformId: (platformId) => set((store => ({gameQuery: {...store.gameQuery, platformId}}))),
}))

export default useGameQeuryStore