import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: any[] = [];
  allNotes: any[] = [];

  searchText = '';

  showModal = false;
  isEdit = false;

  note: any = this.resetNote();

  constructor(
    private service: NoteService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadNotes();
  }

  resetNote() {
    return {
      noteId: null,
      note: '',
      createdAt: '',
      customerLead: {
        customerId: null
      }
    };
  }

  // ===========================
  // Load Notes
  // ===========================

  loadNotes(): void {

    this.service.getAll().subscribe({

      next: (data: any[]) => {
        this.notes = data;
        this.allNotes = [...data];
      },

      error: () => {
        this.toastr.error('Unable to load Notes');
      }

    });

  }

  // ===========================
  // Open Modal
  // ===========================

  openAddModal(): void {
    this.isEdit = false;
    this.note = this.resetNote();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  // ===========================
  // Save / Update
  // ===========================

  saveNote(): void {

    if (this.isEdit) {

      this.service.update(this.note.noteId, this.note)
        .subscribe({

          next: () => {
            this.toastr.success('Note Updated');
            this.closeModal();
            this.loadNotes();
          },

          error: () => {
            this.toastr.error('Update Failed');
          }

        });

    } else {

      this.service.save(this.note)
        .subscribe({

          next: () => {
            this.toastr.success('Note Added');
            this.closeModal();
            this.loadNotes();
          },

          error: () => {
            this.toastr.error('Save Failed');
          }

        });

    }

  }

  // ===========================
  // Edit
  // ===========================

  editNote(note: any): void {

    this.isEdit = true;

    this.showModal = true;

    this.note = JSON.parse(JSON.stringify(note));

  }

  // ===========================
  // Delete
  // ===========================

  deleteNote(id: number): void {

    if (!confirm('Delete this Note?')) {
      return;
    }

    this.service.delete(id)
      .subscribe({

        next: () => {
          this.toastr.success('Deleted Successfully');
          this.loadNotes();
        },

        error: () => {
          this.toastr.error('Delete Failed');
        }

      });

  }

  // ===========================
  // Search
  // ===========================

  search(): void {

    const keyword = this.searchText.trim();

    if (!keyword) {
      this.notes = [...this.allNotes];
      return;
    }

    this.notes = this.allNotes.filter(n =>
      n.customerLead &&
      n.customerLead.customerId &&
      n.customerLead.customerId.toString().includes(keyword)
    );

  }

}