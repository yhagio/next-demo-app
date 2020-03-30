import { withTranslation } from '../i18n';

const About = ({ t }) => {
  return (
    <div className='m-auto mt-3 max-w-lg bg-white rounded overflow-hidden shadow-lg'>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{t('about')}</div>
        <p className='text-gray-700 text-base'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia,
          nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
    </div>
  );
};

About.getInitialProps = async () => ({
  namespacesRequired: ['common', 'nav']
})

export default withTranslation()(About)