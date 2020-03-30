import { NextApiRequest, NextApiResponse } from 'next'
import { localeMaps, ITranslations } from '../../../translations/config'

export default async (req: NextApiRequest, res: NextApiResponse<ITranslations>) => {
  const { query: { lang } } = req
  const { namespace }: any = req.query
  if (typeof lang !== 'string' || !localeMaps[lang]) {
    res.status(400).json({ error: 'error: unknown locale' })
  } else {
    const nav: any = await import(`../../../translations/locales/${lang}/nav`);
    const translations: any = await import(`../../../translations/locales/${lang}/${namespace}`);
    res.status(200).json({ ...translations.default, ...nav.default })
  }
}