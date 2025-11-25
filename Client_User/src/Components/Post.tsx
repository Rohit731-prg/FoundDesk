import useItemStore from "../Store/ItemStore"

function Post() {
    const { item } = useItemStore();
    return (
        <div>
            {!item ? <p>Loading...</p> : 
            <main>
                <p>{item?.title}</p>
                
            </main>}
        </div>
    )
}

export default Post