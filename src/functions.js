import moment from 'moment'

export const displayDate = date => {
  return moment(date, 'YYYY-MM-DD HH:mm Z').format('YYYY-MM-DD')
}
