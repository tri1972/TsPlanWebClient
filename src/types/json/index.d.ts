declare module '*/ApplicationConfig.json' {
    interface ApplicationData {
    
        /**
         * ログイン時間の設定（ms)
         */
        "loginTokenLimit": number;
        /**
         * ルートパスの設定
         */
        "rootPath": string;
    }
  
    const value: ApplicationData;
    export = value;
  }