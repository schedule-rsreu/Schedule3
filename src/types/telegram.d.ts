declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
    umami?: {
      identify: (data: { id: string; telegram_username: string }) => void;
      track: (event: string, data: Record<string, string>) => void;
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
