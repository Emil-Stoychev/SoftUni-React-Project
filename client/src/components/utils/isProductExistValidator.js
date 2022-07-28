export default function validateIsExist(navigate, result){
    if(result.message) {
        return navigate('/404')
    }

    let isEmpty = Object.values(result).filter(x => x !== '')

    if(isEmpty.length === 0) {
        return navigate('/404')
    }
}