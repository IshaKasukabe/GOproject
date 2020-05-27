import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {City} from '../model/city.model';
import {Region} from '../model/region.model';
import {map} from "rxjs/operators";
import {CommentModel} from "../model/comment.model";


@Injectable()
export class CommentsService {

  constructor(private httpClient: HttpClient) {
  }

  createNewComment(comment: CommentModel): Observable<CommentModel> {
    return this.httpClient.post<CommentModel>(`http://localhost:3200/comments`, comment);
  }
}

