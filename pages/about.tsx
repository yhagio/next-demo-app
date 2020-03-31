import { withTranslation } from '../i18n';

const About = ({ t }) => {
  return (
    <div className='m-auto mt-3 max-w-lg bg-white rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{t('about')}</div>
        <p className='text-gray-700 text-base'>{t('description')}</p>
      </div>
    </div>
  );
};

About.getInitialProps = async () => ({
  namespacesRequired: ['about', 'nav']
});

export default withTranslation('about')(About);
