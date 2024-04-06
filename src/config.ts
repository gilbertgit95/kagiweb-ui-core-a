class Config {
    public static AppName = 'Kagiweb tech'
    public static AppDescription = ''
    public static ServerAddress:string = 'http://127.0.0.1:5000'
    public static RootApiEndpoint:string = '/api/v1/'
    public static TokenKey:string = '_auth_token'
    public static AppThemeKey:string = '_app_theme'

    public static defaultDateFormat:string = 'YYYY-MM-DD'
    public static defaultDateTimeFormat:string = 'ddd MMM DD YYYY, hh:mm:ss A'
    public static defaultPageSizeList:number[] = [5, 10, 25, 100]
    public static defaultPageSize:number = 5
    public static defaultPage:number = 1
}

export default Config