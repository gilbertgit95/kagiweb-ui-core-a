import { useAppDispatch, useAppSelector} from '../../stores/appStore';
import { setUserData, clearUserData } from '../../stores/signedInUserSlice';

const Signin = () => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.signedInUser.token)
    const isSignedIn = useAppSelector(state => state.signedInUser.isSignedIn)

    return (
        <div>
            <div>signin page</div>
            <div>{ token }</div>
            <div>{ isSignedIn }</div>
            <button onClick={() => {dispatch(setUserData({token: 'testing_token'}))}}>
                set token btn
            </button>
            <button onClick={() => {dispatch(clearUserData())}}>
                clear store
            </button>
        </div>
    )
}

export default Signin