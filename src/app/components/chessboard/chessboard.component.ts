import { Component, OnInit } from '@angular/core';
import { ChessPieceType } from '../../models/chess-piece-type.enum';
import { ChessPiece } from '../../models/chess-piece';

@Component({
  selector: 'app-chessboard',
  templateUrl: './chessboard.component.html',
  styleUrls: ['./chessboard.component.css']
})
export class ChessboardComponent implements OnInit {

  private pieceAtHand: ChessPiece = undefined;
  private pieceAtHandR: number = undefined;
  private pieceAtHandC: number = undefined;

  private chessBoard: ChessPiece[][] = [
    new Array<ChessPiece>(8),
    new Array<ChessPiece>(8),
    new Array<ChessPiece>(8),
    new Array<ChessPiece>(8),
    new Array<ChessPiece>(8),
    new Array<ChessPiece>(8),
    new Array<ChessPiece>(8),
    new Array<ChessPiece>(8)
  ];

  constructor() {
    this.setupBoard();
  }

  ngOnInit() {
  }

  clickPosition(row, column) {
    const piece = this.chessBoard[row][column];
    if (piece) {
      this.pieceAtHand = piece;
      this.pieceAtHandC = column;
      this.pieceAtHandR = row;
    } else {
      this.chessBoard[row][column] = this.pieceAtHand;
      this.chessBoard[this.pieceAtHandR][this.pieceAtHandC] = undefined;
      this.pieceAtHand = undefined;
    }
    return false;
  }

  setupBoard() {
    /**
     * This is the one way to set up the board
     */
    // in row 7 (with index 6) put white ponds
    for (let i = 0; i < 8; i++) {
      this.chessBoard[6][i] = new ChessPiece(ChessPieceType.Pond, true);
    }
    // in row 2 (with index 1) put black ponds
    for (let i = 0; i < 8; i++) {
      this.chessBoard[1][i] = new ChessPiece(ChessPieceType.Pond, false);
    }
    // put the rooks
    this.chessBoard[0][0] = new ChessPiece(ChessPieceType.Rook, false);
    this.chessBoard[0][7] = new ChessPiece(ChessPieceType.Rook, false);
    this.chessBoard[7][0] = new ChessPiece(ChessPieceType.Rook, true);
    this.chessBoard[7][7] = new ChessPiece(ChessPieceType.Rook, true);
    // put the knights
    this.chessBoard[0][1] = new ChessPiece(ChessPieceType.Knight, false);
    this.chessBoard[0][6] = new ChessPiece(ChessPieceType.Knight, false);
    this.chessBoard[7][1] = new ChessPiece(ChessPieceType.Knight, true);
    this.chessBoard[7][6] = new ChessPiece(ChessPieceType.Knight, true);

    // put the bishops (this is an alternative approach)
    for (let j = 0; j < 8; j += 7) {
      for (let i = 2; i < 8; i += 3) {
        this.chessBoard[j][i] = new ChessPiece(ChessPieceType.Bishop, j > 4);
      }
    }

    // put the queens
    this.chessBoard[0][3] = new ChessPiece(ChessPieceType.Queen, false);
    this.chessBoard[7][3] = new ChessPiece(ChessPieceType.Queen, true);
    // put the kings
    this.chessBoard[0][4] = new ChessPiece(ChessPieceType.King, false);
    this.chessBoard[7][4] = new ChessPiece(ChessPieceType.King, true);
    /**/

    /**
     * This is another way to setup the board
     */
    // for each square
    for (let j = 0; j < 8; j++) {
      for (let i = 0; i < 8; i++) {
        // if it is on row 2 or 7 put a pond, and the side should be white if it is below the middle row
        if (j == 1 || j == 6) {
          this.chessBoard[j][i] = new ChessPiece(ChessPieceType.Pond, j > 4);
        }
        // if it is on row 1 or 8 put a piece based on the column,
        // and the side should be white if it is below the middle row
        if (j == 0 || j == 7) {
          if (i == 0 || i == 7) { // rooks in the corners
            this.chessBoard[j][i] = new ChessPiece(ChessPieceType.Rook, j > 4);
          } else if (i == 1 || i == 6) {  // knights next to the rooks
            this.chessBoard[j][i] = new ChessPiece(ChessPieceType.Knight, j > 4);
          } else if (i == 2 || i == 5) {  // bishops next to the knights
            this.chessBoard[j][i] = new ChessPiece(ChessPieceType.Bishop, j > 4);
          } else if (i == 3) {  // queens
            this.chessBoard[j][i] = new ChessPiece(ChessPieceType.Queen, j > 4);
          } else {            // kings
            this.chessBoard[j][i] = new ChessPiece(ChessPieceType.King, j > 4);
          }
        }
      }
    }
    /**/

    /**
     * This is a third way to setup the board
     */
    // copy into the board a ready setup 2D array
    Object.assign(this.chessBoard, [
      [ // a row with the black pieces
        new ChessPiece(ChessPieceType.Rook, false),
        new ChessPiece(ChessPieceType.Knight, false),
        new ChessPiece(ChessPieceType.Bishop, false),
        new ChessPiece(ChessPieceType.Queen, false),
        new ChessPiece(ChessPieceType.King, false),
        new ChessPiece(ChessPieceType.Bishop, false),
        new ChessPiece(ChessPieceType.Knight, false),
        new ChessPiece(ChessPieceType.Rook, false)
      ],[ // a row with the black ponds
        new ChessPiece(ChessPieceType.Pond, false),
        new ChessPiece(ChessPieceType.Pond, false),
        new ChessPiece(ChessPieceType.Pond, false),
        new ChessPiece(ChessPieceType.Pond, false),
        new ChessPiece(ChessPieceType.Pond, false),
        new ChessPiece(ChessPieceType.Pond, false),
        new ChessPiece(ChessPieceType.Pond, false),
        new ChessPiece(ChessPieceType.Pond, false)
      ],
      // four empty rows
      new Array<ChessPiece>(8),
      new Array<ChessPiece>(8),
      new Array<ChessPiece>(8),
      new Array<ChessPiece>(8),
      [ // a row with the white ponds
        new ChessPiece(ChessPieceType.Pond, true),
        new ChessPiece(ChessPieceType.Pond, true),
        new ChessPiece(ChessPieceType.Pond, true),
        new ChessPiece(ChessPieceType.Pond, true),
        new ChessPiece(ChessPieceType.Pond, true),
        new ChessPiece(ChessPieceType.Pond, true),
        new ChessPiece(ChessPieceType.Pond, true),
        new ChessPiece(ChessPieceType.Pond, true),
      ],[ // a row with the white pieces
        new ChessPiece(ChessPieceType.Rook, true),
        new ChessPiece(ChessPieceType.Knight, true),
        new ChessPiece(ChessPieceType.Bishop, true),
        new ChessPiece(ChessPieceType.Queen, true),
        new ChessPiece(ChessPieceType.King, true),
        new ChessPiece(ChessPieceType.Bishop, true),
        new ChessPiece(ChessPieceType.Knight, true),
        new ChessPiece(ChessPieceType.Rook, true)
      ]
    ]);
    /**/
  }
}
