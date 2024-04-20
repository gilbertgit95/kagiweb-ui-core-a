class Config {
    public static AppName = 'Kagiweb tech'
    public static AppDescription = ''
    public static ServerAddress:string = 'http://192.168.1.3:5000'
    public static RootApiEndpoint:string = '/api/v1/'
    public static TokenKey:string = '_auth_token'
    public static AppThemeKey:string = '_app_theme'

    public static defaultDateFormat:string = 'YYYY-MM-DD'
    public static defaultDateTimeFormat:string = 'ddd MMM DD YYYY, hh:mm:ss A'
    public static defaultPageSizeList:number[] = [5, 10, 25, 100]
    public static defaultPageSize:number = 10
    public static defaultPage:number = 1
}

export default Config