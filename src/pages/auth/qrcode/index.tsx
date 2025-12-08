import { useTranslation } from 'react-i18next';
import { QRCodeSVG } from 'qrcode.react';

function QRCodePage() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-2xl font-bold">{t('auth.qrSignInFormTitle')}</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-4">
        <QRCodeSVG value="https://github.com/LynasTing/lynas-slash-admin" size={200} />
      </div>
    </>
  );
}

export default QRCodePage;
