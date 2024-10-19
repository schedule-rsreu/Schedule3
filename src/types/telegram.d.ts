declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export interface ThemeParams {
  bg_color: string;
  text_color: string;
  link_color: string;
}

export interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  initDataUnsafe: {
    user: {
      id: number;
      first_name: string;
    };
  };
  themeParams: ThemeParams;
}
