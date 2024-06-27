
function Card({name, icon}) {
    return (
        <>
        <div className="card">
            <div>
                <img src={icon} alt={name} />
                <h3>{name}</h3>
            </div>
        </div>
        </>
    )
}

export {Card};