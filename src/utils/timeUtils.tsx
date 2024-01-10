
export default class TimeUtils {
    public static async doNothingFor(sec:number=1):Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve()
            }, sec*1e3)
        })
    }
}