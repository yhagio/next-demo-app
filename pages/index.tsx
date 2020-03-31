import { withTranslation } from '../i18n';

const Index = ({ t }) => {
  return (
    <div className='m-auto mt-3 max-w-lg bg-white rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{t('home')}</div>
        <p className='text-gray-700 text-base'>{t('intro')}</p>
      </div>
    </div>
  );
};

Index.getInitialProps = async () => ({
  namespacesRequired: ['home', 'nav']
});

export default withTranslation('home')(Index);
