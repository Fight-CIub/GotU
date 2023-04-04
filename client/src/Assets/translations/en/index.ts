import { auth } from './auth'
import chat from './chat'
import pages from './pages'
import settings from './settings'
import { authMessages } from './authMessages'
import { searchBar } from './searchBar'
import { landing } from './landing'

export default {
  lang: "English",
  translation: { 
    auth, 
    pages, 
    settings, 
    chat,
    authMessages,
    searchBar,
    landing 
  },
}
