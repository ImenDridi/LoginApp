/**
 * this is the list of the chess piece types
 * each piece name corresponds to a letter,
 * those letters can be used to represend the
 * pieces when we should show them in textual
 * format, but they are also used to show the
 * pieces on the board, since the webfont that
 * we are using has the piece figures on those
 * letters
 * 
 * It also allows us not to use the letters
 * directly in the code. This is very handy in
 * case we need to change the letters that
 * correspond to each piece
 */
export enum ChessPieceType {
    Pond = 'P',
    Rook = 'R',
    Knight = 'N',
    Bishop = 'L',
    King = 'K',
    Queen = 'Q'
}
