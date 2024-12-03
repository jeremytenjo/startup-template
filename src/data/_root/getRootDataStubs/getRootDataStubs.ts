import { type GetRootDataReturn } from '../getRootData/getRootData.js'
import navLinksStubs from '../../_commonSchemas/NavLinkSchema/navLinks.stubs.js'
import socialLinksStubs from '../../_commonSchemas/SocialLinkSchema/socialLinks.stubs.js'

export default function getRootDataStubs(): GetRootDataReturn {
  const data: GetRootDataReturn = {
    previewData: false,
    globalSettings: {},
    navLinks: navLinksStubs,
    socialLinks: socialLinksStubs,
  }

  return data
}
