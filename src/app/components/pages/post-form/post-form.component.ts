import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 class="text-2xl font-bold text-center mb-6">Create / Edit Post</h2>
        <form [formGroup]="postForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <div>
            <label class="block text-gray-700">Title</label>
            <input formControlName="title" type="text" placeholder="Post title" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          </div>

          <div>
            <label class="block text-gray-700">Content</label>
            <textarea formControlName="content" placeholder="Write your post..." rows="4" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"></textarea>
          </div>

          <div>
            <label class="block text-gray-700">Image URL</label>
            <input formControlName="image" type="text" placeholder="Image URL" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          </div>

          <div>
            <label class="block text-gray-700">Category</label>
            <input formControlName="category" type="text" placeholder="Category" class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"/>
          </div>

          <button type="submit" class="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
            Submit
          </button>

        </form>
      </div>
    </div>
  `,
})
export class PostFormComponent {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService, private router: Router) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.postForm.valid) {
      const newPost = this.postForm.value;
      this.postService.createPost(newPost).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}