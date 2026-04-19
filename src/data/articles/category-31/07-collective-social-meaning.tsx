
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_SPIRITUALITY_MEANING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import { ArticleCallout } from '../../../components/article/blocks';

// ============================================================================
// collective-social-meaning | Articles 51–51
// ============================================================================

export const collectivesocialmeaningArticles: Article[] = [
  // --------------------------------------------------------------------------
  // PSY-SPR-064 | Collective Meaning: How Groups Create Shared Purpose and Ide
  // --------------------------------------------------------------------------
  {
    id: catId(51),
    slug: 'collective-meaning',
    title: 'Collective Meaning: How Groups Create Shared Purpose and Identity',
    description: 'Explore collective meaning—how groups create shared narratives, purposes, and identities that transcend individual lives. Understand the psychological power and potential dangers of collective meaning systems.',
    image: '/images/articles/cat31/cover-051.svg',
    category: CATEGORY_SPIRITUALITY_MEANING,
    readTime: 12,
    publishedAt: '2026-03-31',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['collective-social-meaning', 'Collective Meaning', 'How Groups Create Shared Purpose and Identity'],

    summary: '',

    keyFacts: [

    ],

    sparkMoment: '',

    practicalExercise: {
      title: 'Reflection Exercise',
      steps: [
        { title: 'Reflect', description: 'Consider how the concepts in this article apply to your own experience.' },
        { title: 'Journal', description: 'Write down your thoughts and any insights that emerged.' },
      ],
      toolLink: '/tools/mood-journal',
      toolLabel: 'Reflect in the Mood Journal',
    },

    citations: [
      { id: '1', text: 'Swann, W. B., Jr., et al. (2012). When group membership gets personal: A theory of identity fusion. Psychological Review, 119(3), 441-456.', source: 'Psychological Review', year: '2012', link: '', tier: 1 },
      { id: '2', text: 'Haslam, C., et al. (2018). The new psychology of health: Unlocking the social cure. Routledge.', source: 'Routledge', year: '2018', link: '', tier: 1 },
      { id: '3', text: 'Whitehouse, H. (2018). Dying for the group: Towards a general theory of extreme self-sacrifice. Behavioral and Brain Sciences, 41, e192.', source: 'Behavioral and Brain Sciences', year: '2018', link: '', tier: 1 },
      { id: '4', text: 'Hasson, U., et al. (2012). Brain-to-brain coupling: A mechanism for creating and sharing a social world. Trends in Cognitive Sciences, 16(2), 114-121.', source: 'Trends in Cognitive Sciences', year: '2012', link: '', tier: 1 },
      { id: '5', text: 'Atran, S., & Ginges, J. (2012). Religious and sacred imperatives in human conflict. Science, 336(6083), 855-857.', source: 'Science', year: '2012', link: '', tier: 1 },
      { id: '6', text: 'Baumeister, R. F., & Vohs, K. D. (2002). The pursuit of meaningfulness in life. In C. R. Snyder & S. J. Lopez (Eds.), Handbook of positive psychology (pp. 608-618). New York: Oxford University Press.', source: 'Handbook of positive psychology', year: '2002', link: '', tier: 1 },
      { id: '7', text: 'Markus, H. R., & Kitayama, S. (1991). Culture and the self: Implications for cognition, emotion, and motivation. Psychological Review, 98(2), 224-253.', source: 'Psychological Review', year: '1991', link: '', tier: 1 },
      { id: '8', text: 'Triandis, H. C. (1995). Individualism & collectivism. Boulder, CO: Westview Press.', source: 'Individualism & collectivism', year: '1995', link: '', tier: 5 },
      { id: '9', text: 'Baumeister, R. F. (1991). Meanings of life. New York: Guilford Press.', source: 'Meanings of life', year: '1991', link: '', tier: 5 },
      { id: '10', text: 'Anderson, B. (1983/2006). Imagined communities: Reflections on the origin and spread of nationalism (Rev. ed.). London: Verso.', source: 'Imagined communities: Reflections on the origin and spread of nationalism', year: '', link: '', tier: 1 },
      { id: '11', text: 'Tajfel, H., & Turner, J. C. (1979). An integrative theory of intergroup conflict. In W. G. Austin & S. Worchel (Eds.), The social psychology of intergroup relations (pp. 33-47). Monterey, CA: Brooks/Cole.', source: 'The social psychology of intergroup relations', year: '1979', link: '', tier: 1 },
      { id: '12', text: 'Klandermans, B. (2014). Identity politics and politicized identities: Identity processes and the dynamics of protest. Political Psychology, 35(1), 1-22.', source: 'Political Psychology', year: '2014', link: '', tier: 1 },
      { id: '13', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '14', text: 'Turner, J. C., et al. (1987). Rediscovering the social group: A self-categorization theory. Oxford: Basil Blackwell.', source: 'Rediscovering the social group: A self-categorization theory', year: '1987', link: '', tier: 5 },
      { id: '15', text: 'Barth, F. (Ed.). (1969). Ethnic groups and boundaries: The social organization of culture difference. Boston: Little, Brown.', source: 'Ethnic groups and boundaries: The social organization of culture difference', year: '1969', link: '', tier: 1 },
      { id: '16', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '17', text: 'Geertz, C. (1973). Religion as a cultural system. In C. Geertz, The interpretation of cultures (pp. 87-125). New York: Basic Books.', source: 'The interpretation of cultures', year: '1973', link: '', tier: 5 },
      { id: '18', text: 'Smith, W. C. (1962). The meaning and end of religion. New York: Macmillan.', source: 'The meaning and end of religion', year: '1962', link: '', tier: 1 },
      { id: '19', text: 'Xygalatas, D., et al. (2013). Extreme rituals promote prosociality. Psychological Science, 24(8), 1602-1605.', source: 'Psychological Science', year: '2013', link: '', tier: 1 },
      { id: '20', text: 'Pargament, K. I. (1997). The psychology of religion and coping: Theory, research, practice. New York: Guilford Press.', source: 'The psychology of religion and coping: Theory, research, practice', year: '1997', link: '', tier: 1 },
      { id: '21', text: 'Steger, M. F., & Frazier, P. (2005). Meaning in life: One link in the chain from religiousness to well-being. Journal of Counseling Psychology, 52(4), 574-582.', source: 'Journal of Counseling Psychology', year: '2005', link: '', tier: 1 },
      { id: '22', text: 'Anderson, B. (1983/2006). Imagined communities: Reflections on the origin and spread of nationalism (Rev. ed.). London: Verso.', source: 'Imagined communities: Reflections on the origin and spread of nationalism', year: '', link: '', tier: 1 },
      { id: '23', text: 'Hobsbawm, E., & Ranger, T. (Eds.). (1983). The invention of tradition. Cambridge: Cambridge University Press.', source: 'The invention of tradition', year: '1983', link: '', tier: 5 },
      { id: '24', text: 'Nora, P. (1989). Between memory and history: Les lieux de mémoire. Representations, 26, 7-24.', source: 'Representations', year: '1989', link: '', tier: 1 },
      { id: '25', text: 'Bellah, R. N. (1967). Civil religion in America. Daedalus, 96(1), 1-21.', source: 'Daedalus', year: '1967', link: '', tier: 1 },
      { id: '26', text: 'Mosse, G. L. (1990). Fallen soldiers: Reshaping the memory of the world wars. New York: Oxford University Press.', source: 'Fallen soldiers: Reshaping the memory of the world wars', year: '1990', link: '', tier: 5 },
      { id: '27', text: 'Huddy, L., & Khatib, N. (2007). American patriotism, national identity, and political involvement. American Journal of Political Science, 51(1), 63-77.', source: 'American Journal of Political Science', year: '2007', link: '', tier: 1 },
      { id: '28', text: 'Polletta, F., & Jasper, J. M. (2001). Collective identity and social movements. Annual Review of Sociology, 27, 283-305.', source: 'Annual Review of Sociology', year: '2001', link: '', tier: 1 },
      { id: '29', text: 'Gamson, W. A. (1992). The social psychology of collective action. In A. D. Morris & C. M. Mueller (Eds.), Frontiers in social movement theory (pp. 53-76). New Haven, CT: Yale University Press.', source: 'Frontiers in social movement theory', year: '1992', link: '', tier: 1 },
      { id: '30', text: 'McAdam, D. (1988). Freedom summer. New York: Oxford University Press.', source: 'Freedom summer', year: '1988', link: '', tier: 5 },
      { id: '31', text: 'van Zomeren, M., et al. (2008). Toward an integrative social identity model of collective action: A quantitative research synthesis of three socio-psychological perspectives. Psychological Bulletin, 134(4), 504-535.', source: 'Psychological Bulletin', year: '2008', link: '', tier: 1 },
      { id: '32', text: 'Whittier, N. (1995). Feminist generations: The persistence of the radical women\'s movement. Philadelphia: Temple University Press.', source: 'Feminist generations: The persistence of the radical women\'s movement', year: '1995', link: '', tier: 5 },
      { id: '33', text: 'Klar, M., & Kasser, T. (2009). Some benefits of being an activist: Measuring activism and its role in psychological well-being. Political Psychology, 30(5), 755-777.', source: 'Political Psychology', year: '2009', link: '', tier: 1 },
      { id: '34', text: 'Wann, D. L., et al. (2001). Sport fans: The psychology and social impact of spectators. New York: Routledge.', source: 'Sport fans: The psychology and social impact of spectators', year: '2001', link: '', tier: 1 },
      { id: '35', text: 'Bernache-Assollant, I., et al. (2011). Identity fusion and threats to sport team\'s values. Journal of Community & Applied Social Psychology, 21(4), 327-340.', source: 'Journal of Community & Applied Social Psychology', year: '2011', link: '', tier: 1 },
      { id: '36', text: 'Branscombe, N. R., & Wann, D. L. (1991). The positive social and self-concept consequences of sports team identification. Journal of Sport and Social Issues, 15(2), 115-127.', source: 'Journal of Sport and Social Issues', year: '1991', link: '', tier: 1 },
      { id: '37', text: 'Smith, G. J., & Schwartz, A. J. (2003). The sport hero: An endangered species. Quest, 55(1), 64-77.', source: 'Quest', year: '2003', link: '', tier: 1 },
      { id: '38', text: 'Molenberghs, P., et al. (2013). What\'s in a name: Racial grouping, identity, and social preferences. Journal of Experimental Social Psychology, 49(6), 1104-1107.', source: 'Journal of Experimental Social Psychology', year: '2013', link: '', tier: 1 },
      { id: '39', text: 'Wann, D. L., & Weaver, S. (2009). Understanding the relationship between sport team identification and dimensions of social well-being. North American Journal of Psychology, 11(2), 219-230.', source: 'North American Journal of Psychology', year: '2009', link: '', tier: 1 },
      { id: '40', text: 'Wrzesniewski, A., et al. (1997). Jobs, careers, and callings: People\'s relations to their work. Journal of Research in Personality, 31(1), 21-33.', source: 'Journal of Research in Personality', year: '1997', link: '', tier: 1 },
      { id: '41', text: 'Ashforth, B. E., & Mael, F. (1989). Social identity theory and the organization. Academy of Management Review, 14(1), 20-39.', source: 'Academy of Management Review', year: '1989', link: '', tier: 1 },
      { id: '42', text: 'Dik, B. J., & Duffy, R. D. (2009). Calling and vocation at work: Definitions and prospects for research and practice. The Counseling Psychologist, 37(3), 424-450.', source: 'The Counseling Psychologist', year: '2009', link: '', tier: 1 },
      { id: '43', text: 'Van Maanen, J., & Barley, S. R. (1984). Occupational communities: Culture and control in organizations. Research in Organizational Behavior, 6, 287-365.', source: 'Research in Organizational Behavior', year: '1984', link: '', tier: 1 },
      { id: '44', text: 'Pratt, M. G., et al. (2006). Constructing professional identity: The role of work and identity learning cycles in the customization of identity among medical residents. Academy of Management Journal, 49(2), 235-262.', source: 'Academy of Management Journal', year: '2006', link: '', tier: 1 },
      { id: '45', text: 'Duffy, R. D., et al. (2018). Work as a calling: A theoretical model. Journal of Counseling Psychology, 65(4), 423-439.', source: 'Journal of Counseling Psychology', year: '2018', link: '', tier: 1 },
      { id: '46', text: 'Tajfel, H., & Turner, J. C. (1979). An integrative theory of intergroup conflict. In W. G. Austin & S. Worchel (Eds.), The social psychology of intergroup relations (pp. 33-47). Monterey, CA: Brooks/Cole.', source: 'The social psychology of intergroup relations', year: '1979', link: '', tier: 1 },
      { id: '47', text: 'Turner, J. C., et al. (1987). Rediscovering the social group: A self-categorization theory. Oxford: Basil Blackwell.', source: 'Rediscovering the social group: A self-categorization theory', year: '1987', link: '', tier: 5 },
      { id: '48', text: 'Brewer, M. B. (1999). The psychology of prejudice: Ingroup love or outgroup hate? Journal of Social Issues, 55(3), 429-444.', source: 'Journal of Social Issues', year: '1999', link: '', tier: 1 },
      { id: '49', text: 'Tajfel, H., & Turner, J. C. (1986). The social identity theory of intergroup behavior. In S. Worchel & W. G. Austin (Eds.), Psychology of intergroup relations (2nd ed., pp. 7-24). Chicago: Nelson-Hall.', source: 'Psychology of intergroup relations', year: '1986', link: '', tier: 1 },
      { id: '50', text: 'Reicher, S. D., et al. (1995). A social identity model of deindividuation phenomena. European Review of Social Psychology, 6(1), 161-198.', source: 'European Review of Social Psychology', year: '1995', link: '', tier: 1 },
      { id: '51', text: 'Swann, W. B., Jr., et al. (2012). When group membership gets personal: A theory of identity fusion. Psychological Review, 119(3), 441-456.', source: 'Psychological Review', year: '2012', link: '', tier: 1 },
      { id: '52', text: 'Gómez, Á., et al. (2011). The devoted actor\'s will to fight and the spiritual dimension of human conflict. Nature Human Behaviour, 1(9), 673-679.', source: 'Nature Human Behaviour', year: '2011', link: '', tier: 1 },
      { id: '53', text: 'Whitehouse, H., et al. (2014). The evolution of extreme cooperation via shared dysphoric experiences. Scientific Reports, 4, 5910.', source: 'Scientific Reports', year: '2014', link: '', tier: 1 },
      { id: '54', text: 'Swann, W. B., Jr., et al. (2014). What makes a group worth dying for? Identity fusion fosters perception of familial ties, promoting self-sacrifice. Journal of Personality and Social Psychology, 106(6), 912-926.', source: 'Journal of Personality and Social Psychology', year: '2014', link: '', tier: 1 },
      { id: '55', text: 'Buhrmester, M. D., et al. (2015). When do acts of congruence activate identity fusion? Journal of Social Psychology, 155(5), 461-477.', source: 'Journal of Social Psychology', year: '2015', link: '', tier: 1 },
      { id: '56', text: 'Swann, W. B., Jr., & Buhrmester, M. D. (2015). Identity fusion. Current Directions in Psychological Science, 24(1), 52-57.', source: 'Current Directions in Psychological Science', year: '2015', link: '', tier: 1 },
      { id: '57', text: 'Durkheim, É. (1912/1995). The elementary forms of religious life (K. E. Fields, Trans.). New York: Free Press.', source: 'The elementary forms of religious life', year: '', link: '', tier: 5 },
      { id: '58', text: 'Tarr, B., et al. (2016). Synchrony and exertion during dance independently raise pain threshold and encourage social bonding. Biology Letters, 12(10), 20160767.', source: 'Biology Letters', year: '2016', link: '', tier: 1 },
      { id: '59', text: 'Hatfield, E., et al. (1993). Emotional contagion. Current Directions in Psychological Science, 2(3), 96-100.', source: 'Current Directions in Psychological Science', year: '1993', link: '', tier: 1 },
      { id: '60', text: 'Turner, V. (1969). The ritual process: Structure and anti-structure. Chicago: Aldine Publishing.', source: 'The ritual process: Structure and anti-structure', year: '1969', link: '', tier: 1 },
      { id: '61', text: 'Rappaport, R. A. (1999). Ritual and religion in the making of humanity. Cambridge: Cambridge University Press.', source: 'Ritual and religion in the making of humanity', year: '1999', link: '', tier: 5 },
      { id: '62', text: 'Whitehouse, H., & Lanman, J. A. (2014). The ties that bind us: Ritual, fusion, and identification. Current Anthropology, 55(6), 674-695.', source: 'Current Anthropology', year: '2014', link: '', tier: 1 },
      { id: '63', text: 'Haslam, C., et al. (2018). The new psychology of health: Unlocking the social cure. New York: Routledge.', source: 'The new psychology of health: Unlocking the social cure', year: '2018', link: '', tier: 1 },
      { id: '64', text: 'Cacioppo, J. T., & Patrick, W. (2008). Loneliness: Human nature and the need for social connection. New York: W. W. Norton & Company.', source: 'Loneliness: Human nature and the need for social connection', year: '2008', link: '', tier: 1 },
      { id: '65', text: 'Crocker, J., & Luhtanen, R. (1990). Collective self-esteem and ingroup bias. Journal of Personality and Social Psychology, 58(1), 60-67.', source: 'Journal of Personality and Social Psychology', year: '1990', link: '', tier: 1 },
      { id: '66', text: 'Baumeister, R. F. (1991). Meanings of life. New York: Guilford Press.', source: 'Meanings of life', year: '1991', link: '', tier: 5 },
      { id: '67', text: 'Vignoles, V. L., et al. (2006). Beyond self-esteem: Influence of multiple motives on identity construction. Journal of Personality and Social Psychology, 90(2), 308-333.', source: 'Journal of Personality and Social Psychology', year: '2006', link: '', tier: 1 },
      { id: '68', text: 'Cohen, S., & Wills, T. A. (1985). Stress, social support, and the buffering hypothesis. Psychological Bulletin, 98(2), 310-357.', source: 'Psychological Bulletin', year: '1985', link: '', tier: 1 },
      { id: '69', text: 'Fehr, E., & Gächter, S. (2002). Altruistic punishment in humans. Nature, 415(6868), 137-140.', source: 'Nature', year: '2002', link: '', tier: 1 },
      { id: '70', text: 'De Cremer, D., & Van Vugt, M. (1999). Social identification effects in social dilemmas: A transformation of motives. European Journal of Social Psychology, 29(7), 871-893.', source: 'European Journal of Social Psychology', year: '1999', link: '', tier: 1 },
      { id: '71', text: 'van Zomeren, M., et al. (2008). Toward an integrative social identity model of collective action: A quantitative research synthesis of three socio-psychological perspectives. Psychological Bulletin, 134(4), 504-535.', source: 'Psychological Bulletin', year: '2008', link: '', tier: 1 },
      { id: '72', text: 'Fehr, E., & Fischbacher, U. (2004). Third-party punishment and social norms. Evolution and Human Behavior, 25(2), 63-87.', source: 'Evolution and Human Behavior', year: '2004', link: '', tier: 1 },
      { id: '73', text: 'Swann, W. B., Jr., et al. (2014). What makes a group worth dying for? Identity fusion fosters perception of familial ties, promoting self-sacrifice. Journal of Personality and Social Psychology, 106(6), 912-926.', source: 'Journal of Personality and Social Psychology', year: '2014', link: '', tier: 1 },
      { id: '74', text: 'Solomon, S., et al. (2015). The worm at the core: On the role of death in life. New York: Random House.', source: 'New York: Random House', year: '2015', link: '', tier: 5 },
      { id: '75', text: 'Lifton, R. J., & Olson, E. (1974). Living and dying. New York: Praeger.', source: 'Living and dying', year: '1974', link: '', tier: 1 },
      { id: '76', text: 'Becker, E. (1973). The denial of death. New York: Free Press.', source: 'The denial of death', year: '1973', link: '', tier: 5 },
      { id: '77', text: 'Frankl, V. E. (1959/2006). Man\'s search for meaning. Boston: Beacon Press.', source: 'Man\'s search for meaning', year: '', link: '', tier: 5 },
      { id: '78', text: 'Greenberg, J., et al. (1990). Evidence for terror management theory II: The effects of mortality salience on reactions to those who threaten or bolster the cultural worldview. Journal of Personality and Social Psychology, 58(2), 308-318.', source: 'Journal of Personality and Social Psychology', year: '1990', link: '', tier: 1 },
      { id: '79', text: 'Brewer, M. B. (1999). The psychology of prejudice: Ingroup love or outgroup hate? Journal of Social Issues, 55(3), 429-444.', source: 'Journal of Social Issues', year: '1999', link: '', tier: 1 },
      { id: '80', text: 'Haslam, N. (2006). Dehumanization: An integrative review. Personality and Social Psychology Review, 10(3), 252-264.', source: 'Personality and Social Psychology Review', year: '2006', link: '', tier: 1 },
      { id: '81', text: 'Bandura, A. (1999). Moral disengagement in the perpetration of inhumanities. Personality and Social Psychology Review, 3(3), 193-209.', source: 'Personality and Social Psychology Review', year: '1999', link: '', tier: 1 },
      { id: '82', text: 'Atran, S., & Ginges, J. (2012). Religious and sacred imperatives in human conflict. Science, 336(6083), 855-857.', source: 'Science', year: '2012', link: '', tier: 1 },
      { id: '83', text: 'Sherif, M., et al. (1961). Intergroup conflict and cooperation: The Robbers Cave experiment. Norman, OK: University of Oklahoma Book Exchange.', source: 'Intergroup conflict and cooperation: The Robbers Cave experiment', year: '1961', link: '', tier: 1 },
      { id: '84', text: 'Staub, E. (1989). The roots of evil: The origins of genocide and other group violence. Cambridge: Cambridge University Press.', source: 'The roots of evil: The origins of genocide and other group violence', year: '1989', link: '', tier: 5 },
      { id: '85', text: 'Janis, I. L. (1982). Groupthink: Psychological studies of policy decisions and fiascoes (2nd ed.). Boston: Houghton Mifflin.', source: 'Groupthink: Psychological studies of policy decisions and fiascoes', year: '1982', link: '', tier: 1 },
      { id: '86', text: 'Asch, S. E. (1956). Studies of independence and conformity: I. A minority of one against a unanimous majority. Psychological Monographs: General and Applied, 70(9), 1-70.', source: 'Psychological Monographs: General and Applied', year: '1956', link: '', tier: 1 },
      { id: '87', text: 'O\'Gorman, H. J. (1975). Pluralistic ignorance and white estimates of white support for racial segregation. Public Opinion Quarterly, 39(3), 313-330.', source: 'Public Opinion Quarterly', year: '1975', link: '', tier: 1 },
      { id: '88', text: 'Janis, I. L. (1982). Groupthink: Psychological studies of policy decisions and fiascoes (2nd ed.). Boston: Houghton Mifflin.', source: 'Groupthink: Psychological studies of policy decisions and fiascoes', year: '1982', link: '', tier: 1 },
      { id: '89', text: 'Zimbardo, P. G. (2007). The Lucifer effect: Understanding how good people turn evil. New York: Random House.', source: 'The Lucifer effect: Understanding how good people turn evil', year: '2007', link: '', tier: 5 },
      { id: '90', text: 'Lalich, J., & McLaren, K. (2017). Escaping utopia: Growing up in a cult, getting out, and starting over. New York: Routledge.', source: 'Escaping utopia: Growing up in a cult, getting out, and starting over', year: '2017', link: '', tier: 5 },
      { id: '91', text: 'Zablocki, B. (1980). Alienation and charisma: A study of contemporary American communes. New York: Free Press.', source: 'Alienation and charisma: A study of contemporary American communes', year: '1980', link: '', tier: 5 },
      { id: '92', text: 'Galanter, M. (1999). Cults: Faith, healing, and coercion (2nd ed.). New York: Oxford University Press.', source: 'Cults: Faith, healing, and coercion', year: '1999', link: '', tier: 5 },
      { id: '93', text: 'Ebaugh, H. R. F. (1988). Becoming an ex: The process of role exit. Chicago: University of Chicago Press.', source: 'Becoming an ex: The process of role exit', year: '1988', link: '', tier: 5 },
      { id: '94', text: 'Sweet, P. L. (2019). The sociology of gaslighting. American Sociological Review, 84(5), 851-875.', source: 'American Sociological Review', year: '2019', link: '', tier: 1 },
      { id: '95', text: 'Appiah, K. A. (2005). The ethics of identity. Princeton, NJ: Princeton University Press.', source: 'The ethics of identity', year: '2005', link: '', tier: 5 },
      { id: '96', text: 'Brewer, M. B. (1991). The social self: On being the same and different at the same time. Personality and Social Psychology Bulletin, 17(5), 475-482.', source: 'Personality and Social Psychology Bulletin', year: '1991', link: '', tier: 1 },
      { id: '97', text: 'Cadge, W., & Davidman, L. (2006). Ascription, choice, and the construction of religious identities. Journal for the Scientific Study of Religion, 45(1), 23-38.', source: 'Journal for the Scientific Study of Religion', year: '2006', link: '', tier: 1 },
      { id: '98', text: 'Walzer, M. (1988). The company of critics: Social criticism and political commitment in the 20th century. New York: Basic Books.', source: 'New York: Basic Books', year: '1988', link: '', tier: 5 },
      { id: '99', text: 'Crenshaw, K. (1989). Demarginalizing the intersection of race and sex: A Black feminist critique of antidiscrimination doctrine, feminist theory and antiracist politics. University of Chicago Legal Forum, 1989(1), Article 8.', source: 'University of Chicago Legal Forum', year: '1989', link: '', tier: 1 },
      { id: '100', text: 'Hassan, S. (2018). The cult of Trump: A leading cult expert explains how the president uses mind control. New York: Free Press.', source: 'The cult of Trump: A leading cult expert explains how the president uses mind control', year: '2018', link: '', tier: 5 },
      { id: '101', text: 'Bauer-Wu, S., et al. (2008). Fostering mindful leadership and caring organizations. Healthcare, 14(1), 37-44.', source: 'Healthcare', year: '2008', link: '', tier: 1 },
      { id: '102', text: 'Zald, M. N., & Ash, R. (1966). Social movement organizations: Growth, decay and change. Social Forces, 44(3), 327-341.', source: 'Social Forces', year: '1966', link: '', tier: 1 },
      { id: '103', text: 'Branscombe, N. R., et al. (1999). The context and content of social identity threat. In N. Ellemers et al. (Eds.), Social identity (pp. 35-58). Oxford: Blackwell.', source: 'Social identity', year: '1999', link: '', tier: 5 },
      { id: '104', text: 'Putnam, R. D. (2000). Bowling alone: The collapse and revival of American community. New York: Simon & Schuster.', source: 'Bowling alone: The collapse and revival of American community', year: '2000', link: '', tier: 1 },
      { id: '105', text: 'Mansbridge, J. (1983). Beyond adversary democracy. Chicago: University of Chicago Press.', source: 'Beyond adversary democracy', year: '1983', link: '', tier: 5 },
      { id: '106', text: 'Coles, R. (1989). The call of stories: Teaching and the moral imagination. Boston: Houghton Mifflin.', source: 'The call of stories: Teaching and the moral imagination', year: '1989', link: '', tier: 1 },
      { id: '107', text: 'Nussbaum, M. C. (2001). Upheavals of thought: The intelligence of emotions. Cambridge: Cambridge University Press.', source: 'Upheavals of thought: The intelligence of emotions', year: '2001', link: '', tier: 5 },
    ],

    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-neutral-300 mb-8 leading-relaxed">
            .
          </p>
        </div>

        <p className="mb-6">
          Research continues to evolve in this area
          <Citation id="1" index={1} source="Psychological Review" year="2012" tier={1} />
          <Citation id="2" index={2} source="Routledge" year="2018" tier={1} />
          <Citation id="3" index={3} source="Behavioral and Brain Sciences" year="2018" tier={1} />
          , reinforcing the importance of evidence-based approaches.
        </p>

        <p className="text-sm text-gray-500 dark:text-neutral-400 mt-12 italic">
          This article is for educational purposes only and does not constitute medical or psychological advice.
        </p>
      </>
    ),
  },
];
