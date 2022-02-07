import logo from './logo.svg';
import './App.css';

import React, { useMemo } from 'react';
import ReactWebChat, { createDirectLine } from 'botframework-webchat';

function App() {
  const directLine = useMemo(() => createDirectLine({ token: "ew0KICAiYWxnIjogIlJTMjU2IiwNCiAgImtpZCI6ICJlTG1Ja0JEQXdMZHF1cG5EZGVhenJab3RZMzAiLA0KICAieDV0IjogImVMbUlrQkRBd0xkcXVwbkRkZWF6clpvdFkzMCIsDQogICJ0eXAiOiAiSldUIg0KfQ.ew0KICAiYm90IjogIndlYXRoZXJfYm90X3Nlbmlvcl9jYXBzdG9uZSIsDQogICJzaXRlIjogIkNnYlFqN04tdlpRIiwNCiAgImNvbnYiOiAiSFdnOUp6aWozMDFCU203VnZTVVJmOS11cyIsDQogICJuYmYiOiAxNjQ0MjY5NjYwLA0KICAiZXhwIjogMTY0NDI3MzI2MCwNCiAgImlzcyI6ICJodHRwczovL3dlYmNoYXQuYm90ZnJhbWV3b3JrLmNvbS8iLA0KICAiYXVkIjogImh0dHBzOi8vd2ViY2hhdC5ib3RmcmFtZXdvcmsuY29tLyINCn0.LaAN5wwoAEuEOeag9W134msVP9qzETIarX_xuLDlz0qfUIGnGdzHqEyQ1SHghedAnPjejlTEKF4p98u-oGrkVxHba5GnHTQDpjMaw8vdYOw4wBerkZg14HQgGbXISKUggMKrwqAlDgYKYVMCiwzNZCN9nQiMB2yo3hMaJPY5uVuOnxRFX3qxxGXgarnzVZjbyv1UDQBz1UDcSb0XqZgw2YkDGc7uO7WdsApNL9p6lQuwwRVT6VYO6tWnUi2-C0ZCeskzPA9AdsM8HLGcZzBgxG8I1pLDvTkERkyUXbL9OHgj7JLRc882tJ3Ucf7GBy22Z5P2MGbzJTc5T4_TayfEWQ" }), []);

  return (
      <div className="App">
          <ReactWebChat directLine={directLine} userID="jeffreykozik@protonmail.com" />
      </div>
  );
}

export default App;
